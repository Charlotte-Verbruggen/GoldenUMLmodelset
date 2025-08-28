The DestroyBlock application first allows a game admin to design a DestroyBlock
game and then players to play the game and compete for an entry in the game’s 
hall of fame.

DESIGN GAME: A user has a unique username. A user is always a player and 
optionally an admin. A user has the same password as a player and as an admin 
and chooses the admin mode or play mode when logging into the application. 
Only an admin may create a game. 

Each game has a unique name and its own hall of fame. The admin designs a 
game by defining a set of blocks. Each block has a color and is worth a certain 
number of points between 1 and 1000 as specified by the admin.

A game has several levels as defined by the admin. Levels are numbered starting 
with Level 1 and the maximum number of levels is 99. For each level, the admin 
specifies the starting arrangement of blocks. Each block is placed in one cell of a 
grid system. The block at the top left corner is in grid position 1/1, the one to the 
right of it is in grid position 2/1, the one below it is in grid position 1/2, and so on. 
The admin may also define a level as random, i.e., the blocks at the top are 
randomly selected for the level from the set of blocks defined by the admin.

The number of blocks shown at the beginning of each level is the same and is also 
defined by the admin. With each level, the speed of the ball increases starting at 
its minimum speed and the length of the paddle is reduced gradually from its 
maximum length to its minimum length. The minimum speed, speed increase 
factor, maximum length, and minimum length are all specified by the admin for 
the game.

PLAY GAME: A player can play a game when it is published by the game admin. At 
the beginning of a game or level, the DestroyBlock application places the blocks 
at the top of the play area as specified by the admin in the design phase. The ball 
is placed in the center of the play area and drops in a straight line towards the 
bottom. The paddle of the player is positioned in the middle at the bottom of the 
play area. The player moves the paddle to the right or left at the bottom of the 
play area while trying to bounce the ball towards the blocks. The ball moves at a 
certain speed in a certain direction. The ball bounces back from the wall at the 
top as well as the two side walls on the right and left. If the ball hits a block, the 
ball bounces back, the block disappears, and the player scores the points of the 
hit block.

When the ball hits the last block, the player advances to the next level. If the ball 
reaches the bottom wall, the ball is out-of-bounds and the player loses one life. 
The player starts a game with three lives. When the player has lost all three lives 
or the player has finished the last level, the game ends and the total score is 
displayed in the game’s hall of fame. 

At the end of a level or when the player pauses the game, the game is saved. A 
paused game can be resumed by the player. The next level of a game does not 
start automatically but only upon player confirmation.

A user may be a player for one game and an admin for another game but cannot 
be both for the same game. There is only one admin per game. Players compete 
against each other for the high score in the game’s hall of fame. A player may play 
different games and the same game multiple times. However, only one game may 
be played at any point in time, i.e., games are not played in parallel.
