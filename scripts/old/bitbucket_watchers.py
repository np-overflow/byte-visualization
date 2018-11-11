import requests

repo_link = '''
https://api.bitbucket.org/2.0/repositories/tortoisehg/thg/watchers
'''


def get_watchers_bitbucket(link):
    response = requests.get(link)
    response_json = response.json()
    size = response_json['size']
    print("Repository watchers : {}".format(size))
    return size


if __name__ == "__main__":
    get_watchers_bitbucket(repo_link)
