# Advent of Code 2019
## High Level Thoughts
Last year I said I was probably going to use python this year, and yet here I am using typescript. Either I never learn, or I _have_ learned. This past year I got to use typescript at work a lot, so it will be nice to see my comfort level outside that specific context. I'm also just using `ts-node` which should be a lot less irritating than jest or transpilation two years ago.

I considered trying a new language, with either rust or golang being the top two choices. In the end I decided against it for the same reason I wound up using typescript last year: December is a busy time and between balancing work, home, and social commitments I didn't want to end up over-stretched.

## Day by Day
### Day 1
As is tradition at this point, day 1 is mostly just performing a basic calculation on a list of numbers. I considered using a loop instead of recursion on part 2, but the definition of the problem statement was nicely recursive. I didn't bother optimization for tail calls since as far as I can tell node doesn't support it anymore? Also it just wasn't necessary in the problem size.

### Day 2
Yay, we're getting into machine simulation on day 2. As stated in past years, I really like doing machine simulation, though this particular instance was simple enough that I didn't really build out any fancy infrastructure yet. Upon reading part 2 I though I might need to actually figure out what the program was doing, but I decided to just try brute forcing it first and it was fast enough. I extracted out the simulator into its own function that takes inputs and rewrote part 1 to use it, but :shrug:. Still feels a little bit like cheating not to decipher the program.

### Day 3
My first pass at a solution to this problem part 1 was ugly, but worked. I just copy-pasted a bunch of loops around for path traversal. After solving part 2 I abstracted some of it out into a generator that can yield points, and then cleaned up the solutions quite a bit. I probably should have just had the generator include travel distance in the returned object, which would have saved me from one bug I did run into in part 2 (not reseting the total travel distance between the wires). Perfect is the enemy of done though, so it's good enough for today :).

### Day 4
Another inefficient solution, another day. Not wild about double iterating the digits but I prioritized readability in my cleanup pass (my first version of this was _much_ uglier). Also it's still really really fast given the constraints of the problem so yet again :shrug:.