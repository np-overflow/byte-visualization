import pprint
# from mainapi import get_diff_per_element

def get_diff_per_element(list_data):
    return [0] + [j - i for i, j in zip(list_data[:-1], list_data[1:])]

def lang_changes():

    time = ["11.00", "12.00", "13.00"]
    groups = {
        "clojure": {
            'files': {
                'groupname1': [1, 2, 3],
                'groupname2': [2, 3, 4]
            },
            'blank': {
                'groupname1': [2, 3, 4],
                'groupname2': [3, 4, 5]
            },
            'comment': {
                'groupname1': [4, 5, 6],
                'groupname2': [5, 6, 7]
            },
            'code': {
                'groupname1': [5, 6, 7],
                'groupname2': [6, 7, 8]
            }
        }
    }
    total = {
        "clojure": {
            'files': [3, 5, 7],
            'blank': [5, 7, 9],
            'comment': [9, 11, 13],
            'code': [11, 13, 15]
        }
    }

    test_dictionary = {
        'time_frame': time,
        'total': total,
        'groups': groups
    }
    return test_dictionary

def view_changes():
    time = ["11.00", "12.00", "13.00"]

    groups = {
        'count': {
            'groupname1': [numbers],
            'groupname2': [numbers]
        },
        'uniques': {
            'groupname1': [numbers],
            'groupname2': [numbers]
        }
    }
    total = {
        'count': [numbers],
        'uniques': [numbers]
    }

    test_dictionary = {
        'time_frame': time,
        'total': total,
        'groups': groups
    }

    return test_dictionary

def test_get_changes_dummy():

    time = ["11.00", "12.00", "13.00"]

    total = {
        'additions': [2200, 3000, 4800],
        'commits': [14, 23, 36],
        'deletions': [0, 200, 340],
    }
    groups = {
        'additions': {'group1': [1000, 1200, 1400], 'group2': [1200, 1800, 2400]},
        'commits': {'group1': [10, 15, 22], 'group2' : [4, 8, 14]},
        'deletions': { 'group1': [0, 100, 120], 'group2' : [0, 100, 220]},
    }
    users = {
        'additions': {
            'zm': [600, 800, 850],
            'yanhwee': [400, 400, 550],
            'joel': [1000, 1200, 1600],
            'zy': [200, 600, 800]
        },
        'commits': {
            'zm': [5, 8, 14],
            'yanhwee': [5, 7, 8],
            'joel': [2, 5, 9],
            'zy': [2, 3, 5]
        },
        'deletions': {
            'zm': [0, 80, 100],
            'yanhwee': [0, 20, 40],
            'joel': [0, 50, 80],
            'zy': [0, 50, 140]
        },
    }

    test_dictionary = {
        'time_frame' : time,
        'total' : total,
        'groups' : groups,
        'users' : users
    }

    return test_dictionary


def users_difference():
    '''
    {
        'additions':
            'users1' [data that works]
    }
    '''
    return_dictionary = test_get_changes_dummy()
    difference_dictionary = {}

    difference_dictionary['time_frame'] = return_dictionary['time_frame']
    difference_dictionary['additions'] = {}
    difference_dictionary['commits'] = {}
    difference_dictionary['deletions'] = {}

    for user, adds in return_dictionary['users']['additions'].items():
        difference_dictionary['additions'][user] = get_diff_per_element(adds)

    for user, coms in return_dictionary['users']['commits'].items():
        difference_dictionary['commits'][user] = get_diff_per_element(coms)

    for user, dels in return_dictionary['users']['deletions'].items():
        difference_dictionary['deletions'][user] = get_diff_per_element(dels)

    # pprint.pprint(difference_dictionary)
    return difference_dictionary


def groups_difference():
    return_dictionary = test_get_changes_dummy()
    difference_dictionary = {}

    difference_dictionary['time_frame'] = return_dictionary['time_frame']

    for group in return_dictionary['groups']:
        difference_dictionary[str(group)] = {}

    for k, v in return_dictionary['groups']['additions'].items():
        difference_dictionary['additions'][k] = get_diff_per_element(v)

    for k, v in return_dictionary['groups']['commits'].items():
        difference_dictionary['commits'][k] = get_diff_per_element(v)

    for k, v in return_dictionary['groups']['deletions'].items():
        difference_dictionary['deletions'][k] = get_diff_per_element(v)

    # pprint.pprint(difference_dictionary)
    return difference_dictionary


if __name__ == '__main__':
    # test_return_data = test_get_changes_dummy()
    # groups_difference()
    users_difference()
    # pprint.pprint(test_return_data)
    # pprint.pprint(get_diff_per_element(test_return_data['total']['additions']))
    # pprint.pprint(get_diff_per_element(test_return_data['total']['commits']))
    # pprint.pprint(get_diff_per_element(test_return_data['total']['deletions']))
    # pprint.pprint(test_return_data)
