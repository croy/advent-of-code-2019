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

### Day 5

I made so many mistakes on this implementation. The entire way through part 1 I was expecting for the instruction pointer ops to be a later problem and this one's part 2 to be some weird thing, but surprise it was now!

### Day 6

I thought it might be interesting to record some thoughts before I start the problem, then the thoughts after! Looking at part1, this is basically "build a tree and add up the depth of all the nodes" which should be straightforward I think. It's kind of them to explicitly call out the root node of the tree to make the traversal easier.

After part 1: Yep basically what I expected.

Before part 2: I think I can add parent links, traverse starting from SAN's orbit-center annotating each node with depth, then traverse starting from YOU orbit-center and when I first hit a node that's already marked combine the traversal lengths.

After part 2: Yep. I thought about using Djikstra's but I didn't want to implement a min-priority queue and I would have felt bad using a full sort every time (though I suspect later on there will be a problem where I do that and feel bad about it)

### Day 7

The day when my sins start to catch up to haunt me. I knew I should have done a better job of isolating IntCode executions. Shouldn't be hard but it might be uglier than it otherwise could have been.

After part 1: yep, that was fine. Made some hacks instead of actually building input/output, which will probably bite me later.

before part 2: yep, bit me later :) Time to convert execution to generators and yield for input, output, and halt. whee.

After part 2: That conversion wasn't too bad. Not wild about the repeated code pattern at the end of the problem but also didn't want to really formalize input/output streams.

### Day 8

The problem description says this is going to represent a picture, which almost certainly means at some point we're going to combine the layers. I generally try not to think about assumptions like that and just focus on individual parts because I've been surprised by part 2 a lot. In any case, for Part 1 I just intend to make a list of digits, chunk it by my image dimensions and perform the requested calculations.

Yep, have to combine them. The combination isn't too bad though, and zip made it pretty straightforward. Originally I printed out the pixel values but I couldn't read the output so I switched to X and " " which was fine.

### Day 9

I forgot to jot down some thoughts before writing this one, but it was mostly just adding the new address mode. I ended up finally making a separate IntCode as part of this, because I figure this will be common enough to need it (though it seems like maybe this was the last one? I dunno).

### Day 10

Working on this a day late. Problem description seems reasonably straightforward, Can just iterate over all point pairs and store the angles there are asteroids along. Count of unique angles should be the set of visible asteroids.

Yep that was right except I made an initial error of assuming I could just include the asteroid with itself and subtract 1 later. Unfortunately, that results in an atan2 of 0, which means when there is another asteroid on that line it gets unfairly occluded. I originally debated whether I should perform the optimization of only considering each pair once (instead of twice) by counting visibility in both directions, but decided to leave it as a later optimization. It would have saved me from this mistake though :(

Part 2 is rotating a laser, which should just require doing the same type of iteration, putting them into a sort order by angle and then having a list of distances, taking one from each angle each turn.

After: yep but I sure did mess up the angle calculations SO MUCH. Also inelegant solution :/

### Day 11

Getting started on this days behind, so probably not going to prioritize anything but getting it done. This is a neat problem setup to use the IntCode computer we created earlier as a blackbox that we have to keep passing input to and reading output from.

First part was relatively straightforward, next part I guess I'll need to display the output of the hull, hopefully it's also straightforward.

Inverting the coordinate storage was sufficient to just print them out. Technically I should have normalized the grid in case negative numbers cropped up, but they didn't for my input (and according to the puzzle authors last year we are expected to take advantage of things like that?).

### Day 12

Part 1 is a straightforward simulation. Part 2, as guessed, is "figure out and exploit the pattern in the simulation". Normally I have a pretty good guess as to how to do these, but I'm blanking right now and behind so I'll come back to it.

Part 2: Well, I spent a long time trying to figure out the pattern, and kept struggling. Eventually I looked at a hint that pointed out X/Y/Z were independent. This means that you can find the independent cycles and see how long they take to have a shared moment. Thought there might be a trick with them only settling into a stable orbit after a few ticks, but it appears they were already in a stable orbit so that was unnecessary. Calculated combined cycle length by hand because :shrug:

### Day 13

Part 1 seems straightforward, but I do wonder whether the output instructions can overlap squares. I'm going to assume not for now, since it's unclear what the resolution strategy would be there (probably the second draw takes precedence?).

Part 2 was straightforward, but I just clobbered over part 1 for it. thanks git history.

### Day 14

part 1: Straightforward brute forced it, though I feel like there is some more clever way to do the calculation

part 2: I mostly brute forced this except for taking advantage of the fact that I knew we could produce at _least_ the trillion / fuel estimate from part 1. Ran relatively slowly but not unreasonably so.

### Day 15

part 1: Made the assumption that there was only one path to each square, which worked well enough. This isn't guaranteed from the description but it was the case in the sample and was simpler.

part 2: If it's true that each square only has one path, the length of time it should take is equal to the distance of the oxygen tank to the square furthest from it. I _think_ if what I do is start a new search as soon as I've found the tank, this time returning the length of the longest path, that may do it (though it is, of course, also possible the assumption isn't valid and I'll need to actually floodfill, which would be ok.)

after part 2: hey cool it was fine.

### Day 16

Part 1: just brute force

Part 2: skipping for now, probably will have to be a bit more clever. Should be able to drastically reduce the length of the sequence (since places can't impact places after them due to the leading zeros), but that will still leave a lot. Probably a broader pattern to exploit, but I'm sufficiently far behind right now I just want to get a bunch of stars and see what's left after.

Part 2: Hint suggested to look for a pattern backwards, which made the broader pattern clear.

### Day 17

Part 1: pretty straightforward

Part 2: skipping again for now. Seems like a fun problem though (determine possible routes, then see about compressing patterns down).
