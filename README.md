### Intuition of AlphaZero
The model plays a game against itself and evaluates moves first on intuition followed by a deep search. It plays
the move of the deeper search and uses the outcome of the game to adjust the intuition to guess the deep search
move without searching. After the game, the moves of the winning side will be reinforced, while the moves of the
losing party are discouraged.

Note that the output is not a single value but a recommended move with a value of the position. To get accustomed 
to these ideas, I would recommend implementing it for a game like connect 4 first.