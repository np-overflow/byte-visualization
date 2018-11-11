from datetime import datetime, timedelta
import time
import requests
import pickle
import threading
import os, subprocess, shlex

import misc

from pprint import pprint

### Main GET Github / Bitbucket API ###
def get_repos_users_changes(host_name, host_repos_name):
    stats = requests.get("https://api.github.com/repos/"
                         "{}/{}/"
                         "stats/contributors"
                         .format(host_name, host_repos_name), auth = auth)
    
    stats_json = stats.json()

    # As per naming convention: Author -> Username
    users_data = {}
    for author_data in stats_json:
        '''
        pprint(author_data)
        print('\n\n')
        '''
        # Part 1
        author_name = author_data['author']['login']
        author_total_commits = author_data['total']
        # Part 2
        author_weekly_changes = {}
        for week_data in author_data['weeks']:
            unix_timestamp = week_data['w']
            commits = week_data['c']
            additions = week_data['a']
            deletions = week_data['d']

            date = datetime.utcfromtimestamp(unix_timestamp).strftime('%Y-%m-%d')
            author_weekly_changes[date] = {'commits':commits,
                                           'additions':additions,
                                           'deletions':deletions}
        # Part 3    
        users_data[author_name] = {'total_commits':author_total_commits,
                                   'weekly_changes':author_weekly_changes}

    return users_data

def get_all_repos_changes(host_repos_list):
    all_repos_changes = {}
    for (host_name, host_repos_name) in host_repos_list:
        host_dir_name = host_name + '-' + host_repos_name
        all_repos_changes[host_dir_name] = get_repos_users_changes(host_name, host_repos_name)

    return all_repos_changes

def extract_language_data(data):
    data = data.splitlines()
    
    extracted_data = {}
    if len(data) > 4:
        for string in data[9:-3]:
            language, files, blank, comment, code = string.split()
            extracted_data[language] = {}
            extracted_data[language]['files'] = int(files)
            extracted_data[language]['blank'] = int(blank)
            extracted_data[language]['comment'] = int(comment)
            extracted_data[language]['code'] = int(code)

        language, files, blank, comment, code = data[-2].split()
        extracted_data['ALL'] = {}
        extracted_data['ALL']['files'] = int(files)
        extracted_data['ALL']['blank'] = int(blank)
        extracted_data['ALL']['comment'] = int(comment)
        extracted_data['ALL']['code'] = int(code)
        
    else:
        extracted_data = None

    return extracted_data

def get_all_repos_loc2(host_repos_list):
    if len(host_repos_list) == 0: return None

    all_repos_loc = {}
        
    host_repos_index = 0

    host_name1, host_repos_name1 = host_repos_list[host_repos_index]
    host_dir_name1 = host_name1 + '-' + host_repos_name1
    misc.remove_dirs(r'clones\{}'.format(host_dir_name1))
    clone_process1 = subprocess.Popen(shlex.split('git clone https://github.com/'
                                                  '{}/{}/'
                                                  ' '
                                                  'clones/{}'
                                                  .format(host_name1, host_repos_name1,
                                                          host_dir_name1)))

    # Because git clone usually takes a longer time to complete, this code runs the next git clone(if there is) once a git clone process is done, 
    while host_repos_index + 1 < len(host_repos_list): # and runs when the code is counting the previous loc. (loc also takes some time)
        host_name2, host_repos_name2 = host_repos_list[host_repos_index]
        host_dir_name2 = host_name2 + '-' + host_repos_name2
        misc.remove_dirs(r'clones\{}'.format(host_dir_name2))
        clone_process2 = subprocess.Popen(shlex.split('git clone https://github.com/'
                                                      '{}/{}/'
                                                      ' '
                                                      'clones/{}'
                                                      .format(host_name2, host_repos_name2,
                                                              host_dir_name2)))
        clone_process1.wait() # This is to ensure that git clone is completed b4 moving on.
        data = os.popen('cloc-1.80.exe'
                        ' '
                        'clones/{}'
                        .format(host_dir_name1)).read()

        pprint(data, width = 100)
        extract = extract_language_data(data)
        pprint(extract, width = 100)

        all_repos_loc[host_dir_name1] = extract

        clone_process1 = clone_process2
        host_name1 = host_name2
        host_repos_name1 = host_repos_name2
        host_dir_name1 = host_dir_name2

    clone_process1.wait()
    data = os.popen('cloc-1.80.exe'
                    ' '
                    'clones/{}'
                    .format(host_dir_name1)).read()

    pprint(data, width = 100)
    extract = extract_language_data(data)
    pprint(extract, width = 100)

    all_repos_loc[host_dir_name1] = extract

    return all_repos_loc

def get_all_repos_loc(host_repos_list, check_wait = 0):
    all_repos_loc = {}
    clone_processes = []
    for index, (host_name, host_repos_name) in enumerate(host_repos_list):
        host_dir_name = host_name + '-' + host_repos_name
        misc.remove_dirs(r'clones\{}'.format(host_dir_name))
        clone_process = subprocess.Popen(shlex.split('git clone https://github.com/'
                                                     '{}/{}/'
                                                     ' '
                                                     'clones/{}'
                                                     .format(host_name, host_repos_name,
                                                             host_dir_name)))
        clone_processes.append((index, clone_process))

    while len(clone_processes) > 0:
        clone_index = 0
        while clone_index < len(clone_processes):
            index, clone_process = clone_processes[clone_index]
            if clone_process.poll() is not None:
                host_name, host_repos_name = host_repos_list[index]
                host_dir_name = host_name + '-' + host_repos_name
                
                data = os.popen('cloc-1.80.exe'
                                ' '
                                'clones/{}'
                                .format(host_dir_name)).read()

                #pprint(data, width = 100)
                extract = extract_language_data(data)
                #pprint(extract, width = 100)

                all_repos_loc[host_dir_name] = extract

                clone_processes.pop(clone_index)
            else:
                clone_index += 1
                
        time.sleep(check_wait)

    return all_repos_loc

def get_repos_views(host_name, host_repos_name):
    view = requests.get('https://api.github.com/repos/'
                        '{}/{}/'
                        'traffic/views'
                        .format(host_name, host_repos_name),
                        auth = auth)

    view_json = view.json()

    return view_json

def get_all_repos_views(host_repos_list):
    all_repos_views = {}
    for (host_name, host_repos_name) in host_repos_list:
        host_dir_name = host_name + '-' + host_repos_name
        all_repos_views[host_dir_name] = get_repos_views(host_name, host_repos_name)

    return all_repos_views

### Threading & Logging ###
def log_data(get_data_function, interval, file_dir = None, file_name = None, next_log_time = None, args = None, kwargs = None):
    if file_dir is None: file_dir = 'log'

    if file_name is None: file_name = get_data_function.__name__ + '_log'
        
    if next_log_time is None: next_log_time = datetime.now()

    if args is None: args = ()

    if kwargs is None: kwargs = {}

    if type(interval) != timedelta: raise TypeError
    if type(next_log_time) != datetime: raise TypeError

    file_path = os.path.join(file_dir, file_name)

    '''
    if not os.path.isfile('{}.json'.format(file_path)):
        with open('{}.json'.format(file_path),'w') as json_file:
            json.dump({}, json_file)
    '''

    try:
        os.makedirs(file_dir)
    except:
        pass
    
    try:
        with open('{}.json'.format(file_path),'rb') as json_file: # After using pickle, '.json' extension really doesn't matter. Cus file is written in btyes.
            #json.load(json_file)
            pickle.load(json_file)
    except:
        with open('{}.json'.format(file_path),'wb') as json_file:
            #json.dump({}, json_file)
            pickle.dump({}, json_file)

    while True:
        if kill_all_threads:
            print(get_data_function.__name__, ', logging thread killed')
            return None
        
        current_time = datetime.now()
        if current_time >= next_log_time:
            start_time = time.time()
            
            year = datetime.now().year
            month = datetime.now().month
            day = datetime.now().day
            hour = datetime.now().hour
            minute = datetime.now().minute
            second = datetime.now().second # Hey cus why not slows it down like 60 times

            with open('{}.json'.format(file_path), 'rb') as json_file:
                #data = json.load(json_file)
                data = pickle.load(json_file)

            if year not in data:
                data[year] = {}
            if month not in data[year]:
                data[year][month] = {}
            if day not in data[year][month] :
                data[year][month][day] = {}
            if hour not in data[year][month][day]:
                data[year][month][day][hour] = {}
            if minute not in data[year][month][day][hour]:
                data[year][month][day][hour][minute] = {}
            
            data[year][month][day][hour][minute][second] = get_data_function(*args, **kwargs)

            with open('{}.json'.format(file_path), 'wb') as json_file:
                #json.dump(data, json_file)
                pickle.dump(data, json_file)

            #pprint(data)
            time_taken = time.time() - start_time
            print(get_data_function.__name__, ':', time_taken)
            
            next_log_time += interval
            if not keep_check_kill_switch:
                if interval.total_seconds() - 3 - time_taken > 0:
                    time.sleep(interval.total_seconds() - 3 - time_taken) # 3 second allowance
                '''
                Most of the time the CPU will be waiting. Instead of while True: Check,
                I put it to sleep first till it is about to wake up.
                This perhaps, would help to reduce redundant checking and reduce CPU usage
                '''

### Data Manipulation (Time) ###

def get_log_data_between(data, time1, time2):
    if type(time1) != datetime: raise TypeError
    if type(time2) != datetime: raise TypeError
    
    if time1 < time2:
        start_time = time1
        end_time = time2
    elif time1 > time2:
        start_time = time2
        end_time = time1
    else:
        return None

    for year in data.keys():
        if start_time.year == year == end_time.year:
            for month in data[year].keys():
                if start_time.month == month == end_time.month:
                    for day in data[year][month].keys():
                        if start_time.day == day == end_time.day:
                            for hour in data[year][month][day].keys():
                                if start_time.hour == hour == end_time.hour:
                                    for minute in data[year][month][day][hour].keys():
                                        if start_time.minute == minute == end_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                if start_time.second <= second < end_time.second:
                                                    yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                        elif minute == start_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                if start_time.second <= second:
                                                    yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                        elif minute == end_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                if second < end_time.second:
                                                    yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                        elif start_time.minute < minute < end_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                elif hour == start_time.hour:
                                    for minute in data[year][month][day][hour].keys():
                                        if minute == start_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                if start_time.second <= second:
                                                    yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                        elif start_time.minute < minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                elif hour == end_time.hour:
                                    for minute in data[year][month][day][hour].keys():
                                        if minute == end_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                if second < end_time.second:
                                                    yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                        elif minute < end_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                elif start_time.hour < hour < end_time.hour:
                                    for minute in data[year][month][day][hour].keys():
                                        for second in data[year][month][day][hour][minute].keys():
                                            yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                        elif day == start_time.day:
                            for hour in data[year][month][day].keys():
                                if hour == start_time.hour:
                                    for minute in data[year][month][day][hour].keys():
                                        if minute == start_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                if start_time.second <= second:
                                                    yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                        elif start_time.minute < minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                elif start_time.hour < hour:
                                    for minute in data[year][month][day][hour].keys():
                                        for second in data[year][month][day][hour][minute].keys():
                                            yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                        elif day == end_time.day:
                            for hour in data[year][month][day].keys():
                                if hour == end_time.hour:
                                    for minute in data[year][month][day][hour].keys():
                                        if minute == end_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                if second < end_time.second:
                                                    yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                        elif minute < end_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                elif hour < end_time.hour:
                                    for minute in data[year][month][day][hour].keys():
                                        for second in data[year][month][day][hour][minute].keys():
                                            yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                        elif start_time.day < day < end_time.day:
                            for hour in data[year][month][day].keys():
                                for minute in data[year][month][day][hour].keys():
                                    for second in data[year][month][day][hour][minute].keys():
                                        yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                elif month == start_time.month:
                    for day in data[year][month].keys():
                        if day == start_time.day:
                            for hour in data[year][month][day].keys():
                                if hour == start_time.hour:
                                    for minute in data[year][month][day][hour].keys():
                                        if minute == start_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                if start_time.second <= second:
                                                    yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                        elif start_time.minute < minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                elif start_time.hour < hour:
                                    for minute in data[year][month][day][hour].keys():
                                        for second in data[year][month][day][hour][minute].keys():
                                            yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                        elif start_time.day < day:
                            for hour in data[year][month][day].keys():
                                for minute in data[year][month][day][hour].keys():
                                    for second in data[year][month][day][hour][minute].keys():
                                        yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                elif month == end_time.month:
                    for day in data[year][month].keys():
                        if day == end_time.day:
                            for hour in data[year][month][day].keys():
                                if hour == end_time.hour:
                                    for minute in data[year][month][day][hour].keys():
                                        if minute == end_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                if second < end_time.second:
                                                    yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                        elif minute < end_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                elif hour < end_time.hour:
                                    for minute in data[year][month][day][hour].keys():
                                        for second in data[year][month][day][hour][minute].keys():
                                            yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                        elif day < end_time.day:
                            for hour in data[year][month][day].keys():
                                for minute in data[year][month][day][hour].keys():
                                    for second in data[year][month][day][hour][minute].keys():
                                        yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                elif start_time.month < month < end_time.month:
                    for day in data[year][month].keys():
                        for hour in data[year][month][day].keys():
                            for minute in data[year][month][day][hour].keys():
                                for second in data[year][month][day][hour][minute].keys():
                                    yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
        elif year == start_time.year:
            for month in data[year].keys():
                if month == start_time.month:
                    for day in data[year][month].keys():
                        if day == start_time.day:
                            for hour in data[year][month][day].keys():
                                if hour == start_time.hour:
                                    for minute in data[year][month][day][hour].keys():
                                        if minute == start_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                if start_time.second <= second:
                                                    yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                        elif start_time.minute < minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                elif start_time.hour < hour:
                                    for minute in data[year][month][day][hour].keys():
                                        for second in data[year][month][day][hour][minute].keys():
                                            yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                        elif start_time.day < day:
                            for hour in data[year][month][day].keys():
                                for minute in data[year][month][day][hour].keys():
                                    for second in data[year][month][day][hour][minute].keys():
                                        yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                elif start_time.month < month:
                    for day in data[year][month].keys():
                        for hour in data[year][month][day].keys():
                            for minute in data[year][month][day][hour].keys():
                                for second in data[year][month][day][hour][minute].keys():
                                    yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
        elif year == end_time.year:
            for month in data[year].keys():
                if month == end_time.month:
                    for day in data[year][month].keys():
                        if day == end_time.day:
                            for hour in data[year][month][day].keys():
                                if hour == end_time.hour:
                                    for minute in data[year][month][day][hour].keys():
                                        if minute == end_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                if second < end_time.second:
                                                    yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                        elif minute < end_time.minute:
                                            for second in data[year][month][day][hour][minute].keys():
                                                yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                                elif hour < end_time.hour:
                                    for minute in data[year][month][day][hour].keys():
                                        for second in data[year][month][day][hour][minute].keys():
                                            yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                        elif day < end_time.day:
                            for hour in data[year][month][day].keys():
                                for minute in data[year][month][day][hour].keys():
                                    for second in data[year][month][day][hour][minute].keys():
                                        yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
                elif month < end_time.month:
                    for day in data[year][month].keys():
                        for hour in data[year][month][day].keys():
                            for minute in data[year][month][day][hour].keys():
                                for second in data[year][month][day][hour][minute].keys():
                                    yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]
        elif start_time.year < year < end_time.year:
            for month in data[year].keys():
                for day in data[year][month].keys():
                    for hour in data[year][month][day].keys():
                        for minute in data[year][month][day][hour].keys():
                            for second in data[year][month][day][hour][minute].keys():
                                yield (year,month,day,hour,minute,second), data[year][month][day][hour][minute][second]    
                                                    
def get_log_data_per_interval(data, start_time, interval, end_time = None):
    if end_time is None:
        end_time = datetime.now()

    if type(start_time) != datetime: raise TypeError
    if type(end_time) != datetime: raise TypeError
    if type(interval) != timedelta: raise TypeError
    
    starting_time = start_time
    ending_time = starting_time + interval
    while ending_time < end_time:
        last_log_data = None
        for last_log_data in get_log_data_between(data, starting_time, ending_time):
            pass

        yield starting_time, last_log_data
        starting_time = ending_time
        ending_time += interval

### Main API ###
def get_changes_data(start_time = None, interval = None, time_frame_str_format = None, file_dir = None, file_name = None):
    if file_dir is None: file_dir = 'log'

    if file_name is None: file_name = get_all_repos_changes.__name__ + '_log'
    
    if start_time is None:
        start_time = default_start_time

    if interval is None:
        interval = timedelta(hours = 1)

    if time_frame_str_format is None:
        time_frame_str_format = "%H:%M:%S"

    file_path = os.path.join(file_dir, file_name)
    
    with open('{}.json'.format(file_path), 'rb') as json_file:
        data = pickle.load(json_file)

    intervals_log_data = get_log_data_per_interval(data, start_time, interval)
    
    users = {'commits' : {}, 'additions' : {}, 'deletions' : {}}
    groups = {'commits' : {}, 'additions' : {}, 'deletions' : {}}
    total = {'commits' : [], 'additions' : [], 'deletions' : []}
    time_frame = []
    
    for (starting_time, interval_log_data) in intervals_log_data:
        if interval_log_data is None: continue
        
        interval_repos_data = interval_log_data[1]

        total_commits = 0
        total_additions = 0
        total_deletions = 0

        group_name_list = [] # Validation
        user_name_list = [] # To validate if username not in data
        for (group_name, group_data) in interval_repos_data.items():
            group_name_list.append(group_name)
            ### Safety Validation ###
            if group_name not in groups['commits']:
                groups['commits'][group_name] = [0] * len(time_frame)

            if group_name not in groups['additions']:
                groups['additions'][group_name] = [0] * len(time_frame)

            if group_name not in groups['deletions']:
                groups['deletions'][group_name] = [0] * len(time_frame)
                
            group_commits = 0
            group_additions = 0
            group_deletions = 0

            for (user_name, user_data) in group_data.items():
                user_name_list.append(user_name)
                ### Safety Validation ###
                if user_name not in users['commits']:
                    users['commits'][user_name] = [0] * len(time_frame)

                if user_name not in users['additions']:
                    users['additions'][user_name] = [0] * len(time_frame)

                if user_name not in users['deletions']:
                    users['deletions'][user_name] = [0] * len(time_frame)

                user_commits = user_data['total_commits']
                user_additions = 0
                user_deletions = 0

                user_weekly_changes = user_data['weekly_changes']
                for (date, date_data) in user_weekly_changes.items():
                    user_additions += date_data['additions']
                    user_deletions += date_data['deletions']

                users['commits'][user_name].append(user_commits)
                users['additions'][user_name].append(user_additions)
                users['deletions'][user_name].append(user_deletions)
                group_commits += user_commits
                group_additions += user_additions
                group_deletions += user_deletions

            print(user_name_list)

            groups['commits'][group_name].append(group_commits)
            groups['additions'][group_name].append(group_additions)
            groups['deletions'][group_name].append(group_deletions)
            total_commits += group_commits
            total_additions += group_additions
            total_deletions += group_deletions

        ### Safety Validation ###
        for user_name in users['commits'].keys():
            if user_name not in user_name_list:
                users['commits'][user_name].append('asd')

        for user_name in users['additions'].keys():
            if user_name not in user_name_list:
                users['additions'][user_name].append(None)

        for user_name in users['deletions'].keys():
            if user_name not in user_name_list:
                users['deletions'][user_name].append(None)

        ### Safety Validation ###
        for group_name in groups['commits'].keys():
            if group_name not in group_name_list:
                groups['commits'][group_name].append(None)

        for group_name in groups['additions'].keys():
            if group_name not in group_name_list:
                groups['additions'][group_name].append(None)

        for group_name in groups['deletions'].keys():
            if group_name not in group_name_list:
                groups['deletions'][group_name].append(None)

        total['commits'].append(total_commits)
        total['additions'].append(total_additions)
        total['deletions'].append(total_deletions)

        time_frame.append(starting_time.strftime(time_frame_str_format))

    return {'time_frame' : time_frame, 'total' : total, 'groups' : groups, 'users' : users}

def get_loc_data2(start_time = None, interval = None, time_frame_str_format = None):
    if start_time is None:
        start_time = default_start_time

    if interval is None:
        interval = timedelta(hours = 1)

    if time_frame_str_format is None:
        time_frame_str_format = "%H"
    
    with open('{}.json'.format(get_all_repos_loc.__name__), 'rb') as json_file:
        data = pickle.load(json_file)

    intervals_log_data = get_log_data_per_interval(data, start_time, interval)

    languages = {}
    time_frame = []

    for (starting_time, interval_log_data) in intervals_log_data:
        interval_repos_data = interval_log_data[1]

        for language in language.keys():
            languages[language]['files']['total'].append(0)
            languages[language]['blank']['total'].append(0)
            languages[language]['comment']['total'].append(0)
            languages[language]['code']['total'].append(0)

        total_language_list = []
        for (group_name, group_data) in interval_repos_data:

            groups_language_list = []
            for (language, language_data) in group_data:
                groups_language_list.append(language)
                total_language_list.append(language)

                if language not in languages:
                    language_list.append(language)
                    languages[language] = {'files' : {'group' : {},
                                                      'total' : [0] * (len(time_frame) + 1)},
                                           'blank' : {'group' : {},
                                                      'total' : [0] * (len(time_frame) + 1)},
                                           'comment' : {'group' : {},
                                                        'total' : [0] * (len(time_frame) + 1)},
                                           'code' : {'group' : {},
                                                     'total' : [0] * (len(time_frame) + 1)}}

                if group_name not in languages[language]['files']['group']:
                    languages[language]['files'][group_name]['group'] = [0] * len(time_frame)

                if group_name not in languages[language]['blank']['group']:
                    languages[language]['blank'][group_name]['group'] = [0] * len(time_frame)

                if group_name not in languages[language]['comment']['group']:
                    languages[language]['comment'][group_name]['group'] = [0] * len(time_frame)

                if group_name not in languages[language]['code']['group']:
                    languages[language]['code'][group_name]['group'] = [0] * len(time_frame)

                languages[language]['files']['group'][group_name].append(language_data['files'])
                languages[language]['blank']['group'][group_name].append(language_data['blank'])
                languages[language]['comment']['group'][group_name].append(language_data['comment'])
                languages[language]['code']['group'][group_name].append(language_data['code'])
                
                languages[language]['files']['total'][-1] += (language_data['files'])
                languages[language]['blank']['total'][-1] += (language_data['blank'])
                languages[language]['comment']['total'][-1] += (language_data['comment'])
                languages[language]['code']['total'][-1] += (language_data['code'])

            for language in languages.keys():
                if language not in groups_language_list:
                    for (group_name, group_data) in languages[language]['files']['group']:
                        group_data.append(0)
                    for (group_name, group_data) in languages[language]['blank']['group']:
                        group_data.append(0)
                    for (group_name, group_data) in languages[language]['comment']['group']:
                        group_data.append(0)
                    for (group_name, group_data) in languages[language]['code']['group']:
                        group_data.append(0)
                    

        for language in languages.key():
            if language not in total_language_list:
                languages[language]['files']['total'].append(0)
                languages[language]['blank']['total'].append(0)
                languages[language]['comment']['total'].append(0)
                languages[language]['code']['total'].append(0)

        time_frame.append(starting_time.strftime(time_frame_str_format))

    return {'time_frame' : time_frame, 'language' : language}

def get_loc_data(start_time = None, interval = None, time_frame_str_format = None, file_dir = None, file_name = None):
    if file_dir is None: file_dir = 'log'

    if file_name is None: file_name = get_all_repos_loc.__name__ + '_log'

    if start_time is None:
        start_time = default_start_time

    if interval is None:
        interval = timedelta(hours = 1)

    if time_frame_str_format is None:
        time_frame_str_format = "%H:%M:%S"

    file_path = os.path.join(file_dir, file_name)
    
    with open('{}.json'.format(file_path), 'rb') as json_file:
        data = pickle.load(json_file)

    intervals_log_data = get_log_data_per_interval(data, start_time, interval)

    groups = {}
    total = {}
    time_frame = []

    for (starting_time, interval_log_data) in intervals_log_data:
        if interval_log_data is None: continue
        
        interval_repos_data = interval_log_data[1]

        for language in total:
            total[language]['files'].append(0)
            total[language]['blank'].append(0)
            total[language]['comment'].append(0)
            total[language]['code'].append(0)

        total_language_list = set([])
        group_language_list = set([])  # Actually there's no really a reason to keep both language list. one will do.
        for (group_name, group_data) in interval_repos_data.items():
            
            for (language, language_data) in group_data.items():
                pprint(language_data)
                group_language_list.add(language)
                total_language_list.add(language)

                if language not in groups:
                    groups[language] = {'files' : {},
                                        'blank' : {},
                                        'comment' : {},
                                        'code' : {}}

                if group_name not in groups[language]['files']:
                    groups[language]['files'][group_name] = [0] * len(time_frame)

                if group_name not in groups[language]['blank']:
                    groups[language]['blank'][group_name] = [0] * len(time_frame)

                if group_name not in groups[language]['comment']:
                    groups[language]['comment'][group_name] = [0] * len(time_frame)

                if group_name not in groups[language]['code']:
                    groups[language]['code'][group_name] = [0] * len(time_frame)

                groups[language]['files'][group_name].append(language_data['files'])
                groups[language]['blank'][group_name].append(language_data['blank'])
                groups[language]['comment'][group_name].append(language_data['comment'])
                groups[language]['code'][group_name].append(language_data['code'])

                if language not in total:
                    total[language] = {'files' : [0] * (len(time_frame) + 1),
                                       'blank' : [0] * (len(time_frame) + 1),
                                       'comment' : [0] * (len(time_frame) + 1),
                                       'code' : [0] * (len(time_frame) + 1)}

                total[language]['files'][-1] += language_data['files']
                total[language]['blank'][-1] += language_data['blank']
                total[language]['comment'][-1] += language_data['comment']
                total[language]['code'][-1] += language_data['code']

        for language in groups.keys():
            if language not in group_language_list:
                print(groups[language]['files'])
                print(groups[language]['files'][group_name])
                groups[language]['files'][group_name].append(0)
                groups[language]['blank'][group_name].append(0)
                groups[language]['comment'][group_name].append(0)
                groups[language]['code'][group_name].append(0)

        for language in total.keys():
            if language not in total_language_list:
                total[language]['files'].append(0)
                total[language]['blank'].append(0)
                total[language]['comment'].append(0)
                total[language]['code'].append(0)

        time_frame.append(starting_time.strftime(time_frame_str_format))

    return {'time_frame' : time_frame, 'total' : total, 'groups' : groups}

def get_views_data(start_time = None, interval = None, time_frame_str_format = None, file_dir = None, file_name = None):
    if file_dir is None: file_dir = 'log'

    if file_name is None: file_name = get_all_repos_views.__name__ + '_log'
    
    if start_time is None:
        start_time = default_start_time

    if interval is None:
        interval = timedelta(hours = 1)

    if time_frame_str_format is None:
        time_frame_str_format = "%H:%M:%S"

    file_path = os.path.join(file_dir, file_name)
    
    with open('{}.json'.format(file_path), 'rb') as json_file:
        data = pickle.load(json_file)

    intervals_log_data = get_log_data_per_interval(data, start_time, interval)

    groups = {'count' : {}, 'uniques' : {}}
    total = {'count' : [], 'uniques' : []}
    time_frame = []

    for (starting_time, interval_log_data) in intervals_log_data:
        if interval_log_data is None: continue
        
        interval_repos_data = interval_log_data[1]

        total_count = 0
        total_uniques = 0

        group_name_list = []
        for (group_name, group_data) in interval_repos_data.items():
            group_name_list.append(group_name)

            if group_name not in groups['count']:
                groups['count'][group_name] = [0] * len(time_frame)
                
            if group_name not in groups['uniques']:
                groups['uniques'][group_name] = [0] * len(time_frame)

            groups['count'][group_name].append(group_data['count'])
            groups['uniques'][group_name].append(group_data['uniques'])

            total_count += group_data['count']
            total_uniques += group_data['uniques']

        for group_name in groups['count'].keys():
            if group_name not in group_name_list:
                group['count'][group_name].append(None)

        for group_name in groups['uniques'].keys():
            if group_name not in group_name_list:
                group['uniques'][group_name].append(None)

        total['count'].append(total_count)
        total['uniques'].append(total_uniques)

        time_frame.append(starting_time.strftime(time_frame_str_format))

    return {'time_frame' : time_frame, 'total' : total, 'groups' : groups}

# Compilation
def get_diff_per_element(list_data):
    return [0] + [j - i for i, j in zip(list_data[:-1], list_data[1:])]

def get_per_interval_accumulative_length(list_data, length):
    return [sum(list_data[max(0, i - length):i]) for i in range(1, len(list_data) + 1)]

def cvt_over2per_time(data_dict, per_interval_accumulative_length = 1):
    new_dict = {}
    for key, value in data_dict.items():
        if type(value) is dict:
            new_dict[key] = cvt_over2per_time(value)
        elif type(value) is list and all(isinstance(x, int) for x in value):
            new_dict[key] = get_per_interval_accumulative_length(get_diff_per_element(value), per_interval_accumulative_length)
        else:
            new_dict[key] = value

    return new_dict

def rank_list_in_dict(data_dict, rank_range = None, over_time = False):
    if rank_range is None:
        rank_range = (None, None)
    
    new_dict = {}
    for key, value in data_dict.items():
        if key == 'total':
            new_dict[key] = value
            continue
        
        if type(value) is dict:
            if all(isinstance(x, list) for x in value.values()) and len(set(map(len, value.values()))) == 1:
                new_dict[key] = {}
                if over_time:
                    for i in range(len(list(value.values())[0])):
                        for (x, key2) in sorted([(value2[i], key2) for (key2, value2) in value.items()])[::-1][rank_range[0]:rank_range[1]]:
                            if key2 not in new_dict[key].keys():
                                new_dict[key][key2] = [None] * i
                            else:
                                new_dict[key][key2] += [None] * (i - len(new_dict[key][key2]))

                            new_dict[key][key2].append(x)
                    for value2 in new_dict[key].values():
                        value2 += [None] * (len(list(value.values())[0]) - len(value2))
                else:
                    for key2 in sorted(list(value.keys()), key = lambda x : value[x][-1])[::-1][rank_range[0]:rank_range[1]]:
                        new_dict[key][key2] = value[key2]
            else:
                new_dict[key] = rank_list_in_dict(value, rank_range)
        else:
            new_dict[key] = value

    return new_dict

def get_everything(start_time = None, interval = None, time_frame_str_format = None, per_interval_accumulative_length = 1, rank_range = None, over_time = False):
    changes_over_time = get_changes_data(start_time = start_time, interval = interval, time_frame_str_format = time_frame_str_format)
    changes_per_time = cvt_over2per_time(changes_over_time, per_interval_accumulative_length = per_interval_accumulative_length)
    changes_over_time_ranked = rank_list_in_dict(changes_over_time, rank_range = rank_range, over_time = over_time)
    changes_per_time_ranked = rank_list_in_dict(changes_per_time, rank_range = rank_range, over_time = over_time)
    
    loc_over_time = get_loc_data(start_time = start_time, interval = interval, time_frame_str_format = time_frame_str_format)
    loc_per_time = cvt_over2per_time(loc_over_time, per_interval_accumulative_length = per_interval_accumulative_length)
    loc_over_time_ranked = rank_list_in_dict(loc_over_time, rank_range = rank_range, over_time = over_time)
    loc_per_time_ranked = rank_list_in_dict(loc_per_time, rank_range = rank_range, over_time = over_time)
    
    views_over_time = get_views_data(start_time = start_time, interval = interval, time_frame_str_format = time_frame_str_format)
    views_per_time = cvt_over2per_time(views_over_time, per_interval_accumulative_length = per_interval_accumulative_length)
    views_over_time_ranked = rank_list_in_dict(views_over_time, rank_range = rank_range, over_time = over_time)
    views_per_time_ranked = rank_list_in_dict(views_per_time, rank_range = rank_range, over_time = over_time)
    
    everything = {'changes' : {'over_time' : changes_over_time_ranked,
                               'per_time' : changes_per_time_ranked},
                  'loc' : {'over_time' : loc_over_time_ranked,
                           'per_time' : loc_per_time_ranked},
                  'views': {'over_time' : views_over_time_ranked,
                            'per_time' : views_per_time_ranked}}

    return everything

### Main Setup ###
def start_log_thread():
    github_request_per_hour = github_api_hourly_request_rate
    github_total_request_per_set = github_logging_data_request_cost * len(github_host_repos_list)
    github_set_request_per_hour = github_request_per_hour / github_total_request_per_set
    github_set_request_per_hour -= total_set_request_hourly_allowance
    github_wait_hour_per_set_request = 1 / github_set_request_per_hour
    github_datetime_interval = timedelta(hours = github_wait_hour_per_set_request)

    for log_data_function in github_logging_data_function:
        threading.Thread(target = log_data, args = (log_data_function, github_datetime_interval), kwargs = {'args' : (github_host_repos_list,)})
        


### Some Variables ###
# Constants
github_api_hourly_request_rate = 5000

# Default Variables
default_start_time = datetime.now()
total_set_request_hourly_allowance = 1

# Thread Global Variables
kill_all_threads = False
keep_check_kill_switch = False

# User-Defined Variables
github_logging_data_function = [get_all_repos_changes, get_all_repos_loc, get_all_repos_views]
github_logging_data_request_cost = 2
github_host_repos_list = [('lczm','byte-visualization')]#, ('joeltio','byte-social-media')] # Pls, you can't add this into it anymore once the log started else will overflow

auth = ('bytevisualizerboi', 'passwordvisualization1')


# Emergency Kill Switch
import keyboard

def stop_threads(*args, **kwargs):
    global kill_all_threads
    kill_all_threads = True
    print('killing...')

keyboard.add_hotkey('ctrl+`', stop_threads)

# Special Switch

def toggle_keep_checking_kill_switch(*args, **kwargs):
    global keep_check_kill_switch
    keep_check_kill_switch = not keep_check_kill_switch
    print('keep_check_kill_switch', ':', keep_check_kill_switch)

keyboard.add_hotkey('ctrl+0', toggle_keep_checking_kill_switch)



default_start_time = datetime(2018, 11, 10, 19, 57, 44)
views_over_time = get_views_data(interval = timedelta(seconds = 4))
views_per_time = cvt_over2per_time(views_over_time, per_interval_accumulative_length = 1)

# Arbitrary
def a():
	return '{}'.format(datetime.now().strftime('%H:%M:%S'))


#log_data(get_all_repos_changes, timedelta(seconds = 10), args = (github_host_repos_list,))
'''
with open(r'log\get_all_repos_views_log.json', 'rb') as json_file:
    data = pickle.load(json_file)
'''

#pprint(get_views_data(interval = timedelta(seconds = 4)))

#['19:57:47', '19:57:57', '19:58:07', '19:58:17', '19:58:27']
'''
57: {47 57
58: {7 17 27
'''
#pprint(list(get_log_data_between(data, datetime(2018, 11, 10, 19, 57, 44), datetime(2018, 11, 10, 19, 58, 59))))
