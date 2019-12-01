# Advent of Code 2019
## High Level Thoughts
Last year I said I was probably going to use python this year, and yet here I am using typescript. Either I never learn, or I _have_ learned. This past year I got to use typescript at work a lot, so it will be nice to see my comfort level outside that specific context. I'm also just using `ts-node` which should be a lot less irritating than jest or transpilation two years ago.

I considered trying a new language, with either rust or golang being the top two choices. In the end I decided against it for the same reason I wound up using typescript last year: December is a busy time and between balancing work, home, and social commitments I didn't want to end up over-stretched.

## Day by Day
### Day 1
As is tradition at this point, day 1 is mostly just performing a basic calculation on a list of numbers. I considered using a loop instead of recursion on part 2, but the definition of the problem statement was nicely recursive. I didn't bother optimization for tail calls since as far as I can tell node doesn't support it anymore? Also it just wasn't necessary in the problem size.