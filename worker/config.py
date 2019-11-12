REPOS = [
    (
        (lambda user, repo: f'https://github.com/{user}/{repo}.git'),
        [
            ('lczm', 'cosign'),
            ('thenosewizard', 'unBiased'),
            ('mrzzy', 'NP-Portfolio-2'),
        ]
    ),
    (
        (lambda user, repo: f'https://{user}@bitbucket.org/{user}/{repo}.git'),
        [
        ]
    )
]
