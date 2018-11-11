def get_diff_per_element(list_data):
    return [0] + [j - i for i, j in zip(list_data[:-1], list_data[1:])]
