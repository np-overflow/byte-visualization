import requests
import pprint

# Commits
# actual_repo = "https://api.github.com/repos/mrzzy/Cassette/commits?page=1"
# actual_repo2 = "https://api.github.com/repos/joeltio/disclojure/commits?page=3"

# Branches
# test_repo = "https://api.github.com/repos/twitter/bootstrap/branches"

'''
1. Get link
2. Cycle page=1,2,3,4...
3. Keep doing until the page count is 0
4. Keep adding the integer until you get it
5. Return that

TODO : format the dates from ISO 8601 to a normal date

 - try this
import dateutil.parser
yourdate = dateutil.parser.parse(datestring)

If i want to have more per_page
Link: <https://api.github.com/user/repos?page=3&per_page=100>; rel="next",

'''


def get_watchers_bitbucket():
    link = "https://api.github.com/repos/mrzzy/Cassette/commits?page="
    response = requests.get(link)
    response_json = response.json()
    size = response_json['size']
    print(size)
    return size


def get_user_commits_github():

    link = "https://api.github.com/repos/mrzzy/Cassette/commits?page="
    link2 = "https://api.github.com/repos/joeltio/disclojure/commits?page="

    # Variable declarations
    loop = True
    page_counter = 1
    commits = 0

    user_commits = {}

    while loop:
        page_link = link + str(page_counter)

        # github username and password
        # response = requests.get(page_link, auth=('user', 'pass'))

        response = requests.get(page_link)
        response_json = response.json()

        if len(response_json) > 0:
            for i in range(len(response_json)):
                login = response_json[i]['committer']['login']
                date = response_json[i]['commit']['author']['date']

                if login not in  user_commits:
                    user_commits[login] = 1
                else:
                    user_commits[login] += 1

                print("{:10s}, {}".format(login, date))

            page_counter += 1
            commits += len(response_json)
        else:
            print("Ending")
            loop = False

    # Where the last page is
    # print("page counter: {}".format(counter -1))

    # User commits
    pprint.pprint(user_commits)

    # Total commits in the repository, looping over the pages
    print("total commits : {}".format(sum(list(user_commits.values()))))

    return 0

if __name__ == '__main__':
    get_user_commits_github()
