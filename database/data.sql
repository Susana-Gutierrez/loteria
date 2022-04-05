
insert into users
  ("firstName", "lastName", "email", "username", "hashedPassword")
  values
    ('Susana', 'Aguilar', 'sgutierrez@gmail.com', 'sgutierrez', '$argon2i$v=19$m=4096,t=3,p=1$sRb5hJd3ChtQszxO7kmQvQ$VIX7KkCYNBYvsMd5TlTVSmlmTrLxv64fU3+iptc4QsM');


insert into images
  ("imageName", "imageUrl")
  values
    ('Rooster', 'images/cards/1.jpg'),
    ('Little Devil', 'images/cards/2.jpg'),
    ('Lady', 'images/cards/3.jpg'),
    ('Elegant Man', 'images/cards/4.jpg'),
    ('Umbrella', 'images/cards/5.jpg'),
    ('Mermaid', 'images/cards/6.jpg'),
    ('Ladder', 'images/cards/7.jpg'),
    ('Bottle', 'images/cards/8.jpg'),
    ('Barrel', 'images/cards/9.jpg'),
    ('Tree', 'images/cards/10.jpg'),
    ('Melon', 'images/cards/11.jpg'),
    ('Brave', 'images/cards/12.jpg'),
    ('Hat', 'images/cards/13.jpg'),
    ('Death', 'images/cards/14.jpg'),
    ('Pear', 'images/cards/15.jpg'),
    ('Flag', 'images/cards/16.jpg'),
    ('Bandolon', 'images/cards/17.jpg'),
    ('Cello', 'images/cards/18.jpg'),
    ('Heron', 'images/cards/19.jpg'),
    ('Bird', 'images/cards/20.jpg'),
    ('Hand', 'images/cards/21.jpg'),
    ('Boot', 'images/cards/22.jpg'),
    ('Moon', 'images/cards/23.jpg'),
    ('Parrot', 'images/cards/24.jpg'),
    ('Drunk', 'images/cards/25.jpg'),
    ('Heart', 'images/cards/26.jpg'),
    ('Watermelon', 'images/cards/27.jpg'),
    ('Drum', 'images/cards/28.jpg'),
    ('Shrimp', 'images/cards/29.jpg'),
    ('Arrows', 'images/cards/30.jpg'),
    ('Musician', 'images/cards/31.jpg'),
    ('Spider', 'images/cards/32.jpg'),
    ('Soldier', 'images/cards/33.jpg'),
    ('Star', 'images/cards/34.jpg'),
    ('Saucepan', 'images/cards/35.jpg'),
    ('World', 'images/cards/36.jpg'),
    ('Cactus', 'images/cards/37.jpg'),
    ('Scorpion', 'images/cards/38.jpg'),
    ('Rose', 'images/cards/39.jpg'),
    ('Skull', 'images/cards/40.jpg'),
    ('Bell', 'images/cards/41.jpg'),
    ('Pitcher', 'images/cards/42.jpg'),
    ('Deer', 'images/cards/43.jpg'),
    ('Sun', 'images/cards/44.jpg'),
    ('Crown', 'images/cards/45.jpg'),
    ('Canoe', 'images/cards/46.jpg'),
    ('Pine Tree', 'images/cards/47.jpg'),
    ('Fish', 'images/cards/48.jpg'),
    ('Palm', 'images/cards/49.jpg'),
    ('Flowerpot', 'images/cards/50.jpg'),
    ('Harp', 'images/cards/51.jpg'),
    ('Frog', 'images/cards/52.jpg');


insert into cards
  ("cardName")
  values
    ('Card 1'),
    ('Card 2'),
    ('Card 3'),
    ('Card 4'),
    ('Card 5'),
    ('Card 6'),
    ('Card 7');

insert into "imagesAssigned"
  ("cardId", "imageId")
  values
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 10), (1, 11), (1, 12), (1, 13), (1, 19), (1, 20), (1, 21), (1, 22), (1, 27), (1, 28), (1, 29), (1, 30),
    (2, 2), (2, 3), (2, 4), (2, 5), (2, 7), (2, 8), (2, 9), (2, 10), (2, 12), (2, 13), (2, 14), (2, 15), (2, 17), (2, 18), (2, 19), (2, 20),
    (3, 21), (3, 22), (3, 23), (3, 24), (3, 29), (3, 30), (3, 31), (3, 32), (3, 37), (3, 38), (3, 39), (3, 40), (3, 46), (3, 47), (3, 48), (3, 49),
    (4, 40), (4, 41), (4, 42), (4, 43), (4, 45), (4, 46), (4, 47), (4, 48), (4, 50), (4, 51), (4, 52), (4, 1), (4, 38), (4, 10), (4, 19), (4, 20),
    (5, 9), (5, 5), (5, 11), (5, 16), (5, 44), (5, 52), (5, 30), (5, 46), (5, 6), (5, 34), (5, 37), (5, 14), (5, 24), (5, 19), (5, 23), (5, 51),
    (6, 1), (6, 2), (6, 42), (6, 43), (6, 10), (6, 11), (6, 47), (6, 13), (6, 19), (6, 51), (6, 21), (6, 30), (6, 38), (6, 28), (6, 29), (6, 22),
    (7, 38), (7, 23), (7, 4), (7, 5), (7, 26), (7, 27), (7, 9), (7, 29), (7, 31), (7, 13), (7, 33), (7, 34), (7, 36), (7, 18), (7, 37), (7, 22);
