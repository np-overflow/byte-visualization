import requests


repo_link = 'https://api.github.com/repos/ravernkoh/kubo/subscribers'
repo_link2 = '''
https://api.github.com/repos/git/git/subscribers?per_page=100&page=
'''


def get_watchers_github(link):
    counter = 0
    loop = True
    page_counter = 1

    while loop:
        page_link = link + str(page_counter)

        response = requests.get(page_link, auth=('user', 'password'))
        response_json = response.json()
        print(response)

        if len(response_json) > 0:
            page_counter += 1
            counter += len(response_json)

            print("Length {}".format(len(response_json)))
            print("Counter {}".format(counter))
        else:
            loop = False
            break

    print("Length of watchers : {}".format(counter))
    return counter


if __name__ == "__main__":
    get_watchers_github(repo_link2)
