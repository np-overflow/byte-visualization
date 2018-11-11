import requests
import pprint



def error_response():
    link = "https://api.bitbucket.org/2.0/repositories/tortoisehg/thg/commits/master?page="

    response = requests.get(link)
    response_json = response.json()

    print(response_json)


def boiler_plate():

    page_counter = 25
    link = "https://api.bitbucket.org/2.0/repositories/fenics-project/docker/commits/master?page="
    page_link = link + str(page_counter)

    response = requests.get(page_link)
    response_json = response.json()

    print(response_json)

    # pprint.pprint(response_json["values"])
    # pprint.pprint(type(response_json["values"]))
    # print(len(response_json["values"]))

    # print(response_json["values"][30]["author"].keys())

def get_watchers_bitbucket():
    link = "https://api.bitbucket.org/2.0/repositories/tortoisehg/thg/watchers"
    test_link = "https://api.bitbucket.org/2.0/repositories/fenics-project/docker/watchers"
    response = requests.get(link)
    response_json = response.json()
    size = response_json['size']
    print(size)
    return size


def get_user_commits_bitbucket():
    # "https://bitbucket.org/fenics-project/docker/commits/all"
    # "https://bitbucket.org/tortoisehg/thg/commits/all"
    # "https://bitbucket.org/tortoisehg/thg"
    # GET /repositories/{username}/{repo_slug}/commits/
    # GET /repositories/{username}/{repo_slug}/commits/master

    link = "https://api.bitbucket.org/2.0/repositories/fenics-project/docker/commits/master?page="
    test_link = "https://api.bitbucket.org/2.0/repositories/tortoisehg/thg/commits/default?page="

    user_commits = {}
    loop = True
    # start the page at 1
    page_counter = 1

    while loop:
        page_link = link + str(page_counter)

        response = requests.get(page_link)
        response_json = response.json()

        print("The page counter right now is {}".format(page_counter))

        if 'error' not in response_json.keys() and len(response_json["values"]) > 0:
            for i in range(len(response_json['values'])):
                if 'user' in response_json["values"][i]["author"].keys():
                    login = response_json["values"][i]["author"]["user"]["username"]
                    print(login)
                    if login not in user_commits:
                        user_commits[login] = 1
                    else:
                        user_commits[login] += 1
                else:
                    if 'unregistered' not in user_commits:
                        user_commits['unregistered'] = 1
                    else:
                        user_commits['unregistered'] += 1

            page_counter +=1
        else:
            print("Breaking")
            loop = False

    pprint.pprint(user_commits)
    print("Total amount of commits : {}".format(sum(list(user_commits.values()))))

    return 0

if __name__ == '__main__':
    # get_user_commits_bitbucket()
    get_watchers_bitbucket()
    # error_response()
    # boiler_plate()
