import pprint
# from mainapi import get_diff_per_element
# from separatescripts import get_diff_per_element


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


if __name__ == '__main__':
    test_return_data = test_get_changes_dummy()
    # pprint.pprint(test_return_data)
    pprint.pprint(get_diff_per_element(test_return_data['total']['additions']))
    pprint.pprint(get_diff_per_element(test_return_data['total']['commits']))
    pprint.pprint(get_diff_per_element(test_return_data['total']['deletions']))
    # pprint.pprint(test_return_data)
