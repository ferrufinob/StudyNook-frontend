# StudyNook

StudyNook provides users a place to organize and study developer flashcards.

## Current Features

- [x] organize and create flashcards by deck categories provided.
- [x] edit flashcard
- [x] delete flashcard
- [x] search bar filters through questions and answers
- [x] card flip

![last commit](https://img.shields.io/github/last-commit/ferrufinob/StudyNook-frontend)

[Backend Repo](https://github.com/ferrufinob/StudyNook-backend.git)

![app](app_demo.gif)

## Installation

### Backend

```ruby
git clone
bundle install
rails db:migrate
rails db:seed
rails s
```

Open browser to 'http://localhost/3000' to start Rails API.

### Frontend

```ruby
git clone
open index.html
```

### Future Development

- [ ] dark mode
- [ ] user model
- [ ] display and update card count in deck view page any time a new flashcard is added.
- [ ] display one card at a time with previous and next buttons

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
