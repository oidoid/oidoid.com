---
dateModified: '2024-01-20'
datePublished: '2021-01-23'
keywords:
  [
    'blog',
    'game dev',
    'Nature Elsewhere',
    'game design document',
    'GDD',
    'illustration'
  ]
headline: 'Nature Elsewhere, starting over again, and a grand new art style.'
title: 'January'
---

## History

I recently uncovered
[notes from a predecessor to Nature Elsewhere](https://forums.tigsource.com/index.php?topic=58848),
[Once & Future Cactus](https://github.com/niedzielski/once-and-future-cactus).
Your avatar was this soap-bodied lozenge, a cactus and king. It was to be a sort
of action, beat-'em-up, silly adventure game. I felt like I got some experience
drawing pixel art and some hope that if I kept the resolution small enough, I
could achieve some modest vision for it and actually finish something. I also
got enough experience in Phaser (version 2) to and, if I recall correctly, one
or two other frameworks, to know that I couldn't make a pixel game as tight as I
wanted to using them at the time.

OAFC was also the beginning of [mem font](https://rndmem.com). You can see in
the screenshots on the thread how obsessed I was with trying to keep the
resolution minimal in the hopes of being able to focus on something small but
good; to do less, better. It was a blind pursuit of patterns though and you can
see how the 5x6 forms now available are much more balanced while still keeping
the intent.

When I realized just how much time I was dumping into Once & Future Cactus, and
how much I still had left, I decided that I wanted something more for it. If I
was going to pour so much of my life into something, I had really better mean it
and it had better be meaningful to me. Although it was time to let go of Once &
Future Cactus, many ideas emerged more clearly than they had arrived and remain
in some form.

I eventually moved on to
[Sound of Water](https://github.com/niedzielski/sound-of-water), as I recall,
but didn't make it too far into that either before picking up Nature Elsewhere
starting with the seven pixel backpacker, the pond, and tree as a side-scroller.
I have finally resolved to avoid music for Nature Elsewhere but I can't
compromise on all audio and with some dread look forward to it starting those
efforts which ended SOW.

## Starting Over Again

For many, 2020 was one of the worst years in living memory. For me personally,
it was as well but for quite selfish reasons. It's the first year I've had where
I felt less than I was before without any of the usual accrual of wisdom and
experience that offset the other matters of being. Both physically and mentally,
it was an overall loss.

For Nature Elsewhere, it was a tumultuous year that started with great hope: a
port from TypeScript to Rust and WebAssembly. The port started well enough given
I had no prior Rust experience but then it lingered. It has remained resting for
far too long.

I upstreamed Nature Elsewhere's significantly deviated mem font back to the mem
repo and changed the paint program to Aseprite which I vastly prefer for
pixeling to Gimp.

I made a [Tic-Tac-Toe](https://github.com/oddoid/nttt) mini project and started
a [Klondike Solitaire](https://github.com/oddoid/klondike-solitaire) project to
explore different programming styles. I started
[writing about it](https://github.com/niedzielski/state-and-ops).

I made a few websites...

It just got harder and harder to get back to the game's code. It has now been so
long since I've laid a line for the project in any form that I don't know what
the future language will be. Past me hasn't been very kind to myself and it will
be difficult to pick back up in any state, should I choose to. Regardless, I've
deferred all implementation details as I finally feel confident that I can
overcome any technical obstacles given a clear design goal.

I am sad that I don't think I am likely to have as much overlap with my language
of choice for Nature Elsewhere and what I code in professionally.

In TypeScript, I have been experimenting with different programming styles and
concepts in some tiny projects. I end up just confusing myself and going around
in circles more than anything else. I just can't find an approach to the
fundamentals that satisfies me. I get caught up going back and forth on the
tradeoffs like typing as strict as possible vs the often significantly more
practical just doing. I get some useful stuff out of each project but inevitably
seem to get utterly lost along the way.

## A Game Design Document

At some point during the year, I figured that the best way to move forward would
be to _really_ nail down what I wanted to make. No expense spared. I was going
to put it to the letter this time so I could actually build what I wanted. After
all, I had great success with the mocks I had made for the world of Nature
Elsewhere, the settings screen, and the level editor. This GDD would simply
expand on that in every way.

Some months went by digging deeper and deeper until I was totally lost in a
briar patch of a game design document, the start of a technical design document,
two code branches, and countless notes and designs. What a mess! This isn't
working for me. I can't even the manage notes for a game, how will I manage to
complete the game?

I despaired. I was lost.

I am trying so hard not to go in circles, and not get lost in the endless
context switches between life, work, and Nature Elsewhere. I am getting better
at these switches and all is not lost when some of the context is. Some things
do stick from iteration to iteration and I'm grateful when i'm able to isolate a
small gem and preserve it clearly. I think the mem font is one such.

I do get a lot of value often out of doing a deep dive exploration into some
niche topic but then I inevitably go too deep and get totally lost for weeks or
more. It's like there's a tipping point of diminishing returns or coming up for
air that I'm just terrible at recognizing. I think it's because I always feel
like it's really hard to do anything so I'd never get anything done if I gave up
when it was really hard.

I'm a lot closer than I was in terms of potential but just as far away as having
never started in terms of finishing.

## Sketches

I have now concluded to focus rather strictly on a few large and very refined
level sketches, intended to be as close to the finished game as possible. Once
complete, they're intended to evoke the feeling of "I wish I could play this
game."

I think a mock is the lightest weight and most helpful plan I can make and
manage over time. I can capture quite a lot of visual detail, but also hint at
gameplay mechanics and other aspects. I feel the main overhead is in Aseprite
currently being unable to handle tiling so well. I just have to kind of copy and
paste everything.

## Tablet

I've started pixeling using my partner's old drawing tablet. It's been great for
putting a lot of pixels down fast and, it may not surprise you, far more natural
than a pen. I would have thought it would be too organic for pixel art but that
is not the case. Any loose forms can be cleaned up afterwards with the mouse and
I switch between them. A tablet is also great for exploration and more freeform
sketches.

## The World of Nature Elsewhere

I have also resolved to rethink the art style all over. If you'll recall, the
original conceptualization for Nature Elsewhere was a side-scroller. It took me
a great deal of time mentally to understand that I wanted it to be an isometric
view and absolutely ages to begin to understand how that should actually look.
You can see evidence of this in the backpacker which has an orthographic profile
perspective.

I am still having great trouble wrapping my head around it but it's starting to
slowly come together. I am building an appreciation for what it means to make
the sprites feel cohesive together as one level rather than only nice
independently. Sprites are likely to only ever appear together. Like characters
in a font, a beautiful cursive A probably won't work well even with the most
perfect serif E. I'm better off with characters or sprites that focus on looking
great together rather than in isolation.

I am a bit stuck with the rhythm of tiles and how they'll work in the level
design. That's been a cloud of confusion for many months. I am trying to
leverage references and notes rather than get lost in them.

Here's the latest sketch in part:

[![](20210123-sketch.png)](20210123-sketch.png)

## Future History

Of course, feeling like my own historian and Nature Elsewhere being open-source,
I love the idea of being able to document thoroughly and completely as I go but
I can't do it how I'd like and make the progress I'd like to along with keeping
my other responsibilities in living. Oh well. I've got to do less, better.
