REPOS = [
    (
        (lambda user, repo: f'https://github.com/{user}/{repo}.git'),
        [
            ('Tooawesome15', 'temp')
        ]
    ),
    (
        (lambda user, repo: f'https://{user}@bitbucket.org/{user}/{repo}.git'),
        [
        ]
    )
]