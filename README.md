# Loteria Mexicana

A web application for all users who want to have a good time playing a
game similar to bingo.

Loteria Mexicana is part of the culture and identity of Mexicans. Growing up in Mexico, I spent a lot of time with my family and friends playing this game on summer evenings or on rainy days. Loteria reminds me of my childhood and I wanted to share a little bit of my culture with all users that want to have fun. I also created this game to continue playing online with my love ones even in the distance.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- React.js
- Node.js
- Express.js
- Webpack
- PostgreSQL
- SQL
- Socket.IO
- Figma

## Live Demo

Try the application live at [http://loteria-lamexicana.com](http://loteria-lamexicana.com)

## Features

- Users can create an account.
- Users can sign in.
- Users can review their profile.
- Users can edit their profile.
- Users can delete their profile.
- Users can review game instructions.
- Users can create a game.
- Users can access the game.
- Users can select a card.
- Users can start the game.
- Users can select images on their assigned card.
- Users can win 5 points when they get a full line of selected images.
- Users can win loteria when they get all the card images selected.
- Users can see accumulated points.
- Users can restart the game.
- Users can close the game.

## Stretch Features

- Users can see the image translation.
- Users can message other users.

## Previous
![Select Card](assets/select-card.gif)
![Start Game](assets/start-game.gif)

## Getting Started

1. Clone the repository.

```shell
git clone git@github.com:Susana-Gutierrez/loteria-mexicana.git
cd loteria
```

2. Install dependencies.

```shell
npm install
```

3. Copy .env.example file to define port server, token and database url.

```shell
cp .env.example .env
```

4. Start Webpack and Express servers.

```shell
npm run dev
```

5. Test backend server.

```shell
http :3001/api/test
```

6. Start PostgreSQL server.
```shell
sudo service postgresql start
```

7. Create database.

```shell
createdb loteria
```

8. Change .env file with database name.

```shell
DATABASE_URL=postgres://dev:dev@localhost/loteria
```

9. Import database.

```shell
npm run db:import
```
