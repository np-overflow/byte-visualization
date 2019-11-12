REPOS = [
    (
        (lambda user, repo: f'https://github.com/{user}/{repo}.git'),
        [
            ('lczm', 'cosign'),
        ]
    ),
    (
        (lambda user, repo: f'https://{user}@bitbucket.org/{user}/{repo}.git'),
        [
        ]
    )
]
