---
dateModified: '2024-01-20'
datePublished: '2019-10-01'
keywords:
  [
    'blog',
    'game dev',
    'Nature Elsewhere',
    'mem',
    'JSON Schema',
    'aseprite-atlas',
    'oddoid',
    'oidoid'
  ]
headline: 'One month into a sabbatical for Nature Elsewhere development.'
title: 'September'
---

The seasons are changing in Colorado and cooler weather approaches. Today has
been a reflective day for me and I wish to record some project thoughts, mostly
on the work of the past month. A visual overview can be seen in the linked
video:

<video controls width=704 poster=20191001-2356dfc-overview.png src=20191001-2356dfc-overview.webm></video>

## Collision Subsystem

The collision subsystem is beginning to take shape. All entities can collide
now. Different classes of collision such as obstacle or impedance are possible
and processing is hierarchical with each entity choosing the strategy wanted
(e.g., image bounds or collision rectangle array).

There is currently a bug where the collision class is not considered when
sliding during multiple collisions. I would guess that there's also a bug in how
active and inactive entities collide.

## Palette

Of the few content changes I made in September was a slight revision to the
palette. I tweaked most of the colors and added a new shade specifically for
drawing shadows on a variety of terrains. Such a little change took long!

Lately, I've been extremely guarded about adding new colors as in previous
iterations I lost control of the palette. I'm still unhappy with the results but
I think it's a slight improvement and am trying to wait to make further changes
until more of the entities are available and I can balance them all together for
a tremendously colorful scene instead of an optimal single character.

I worry a lot about color calibration and its been a recurring problem for the
project. I notice subtle differences across my devices that make me sad and I
have to force sRGB in Chromium.

Unfortunately, I don't have any cool before and after screenshots for the latest
changes (and am too lazy to dig through Git) but I did aggregate a short clip of
development from March 11th, 2018 through October 1st, 2019:

<a href=20180311-20191001.gif><img src=20180311-20191001.gif width=704></a>

## JSON Schema

I spent a day experimenting with applying JSON Schemas to the entity subsystem,
primarily through the excellent
[Ajv library](https://github.com/epoberezkin/ajv).

The schema validation was valuable and it was nice to drop some of the custom
(albeit simple) parsers for something extensible, "proper," and closer to
TypeScript's virtues. However, I found support for deep merging, patching, and
defaults lacking, I struggled with understanding JSON Schema's relationship with
JSON-LD and related technologies, and it all just felt a tiny bit still cooking
in parts. The TypeScript back and forth interface generation looked promising
though I didn't get around to experimenting with it. I would also still need to
either inject some custom parser logic for certain components or introduce a new
lifecycle.

If the Nature Elsewhere system of entities was going to be far larger, I would
most probably need a JSON Schema-like solution. In general, knowing when a
solution is over- or under-engineered has been a problematic theme for Nature
Elsewhere. For now, I think JSON Schema would be overkill.

## mem-font

After staring at pixelated print for ages, tweaking letters back and forth and
then back again, and consultations with my partner, I've made several
miscellaneous minor font changes to mem-font.

Most notably, I've embraced that the font is really 3px x 5px (not 3px x 4px)
with 1px of leading. Given my pursuit of minimalism, it felt like a major
concession. That's 3px x 3px for most of the letter forms and then another pixel
above and below for ascenders and descenders. I've made the sizing change to the
character images themselves which simplified the text layout code a little too
at the cost of a slightly larger sprite sheet footprint.

I've also now tried to generally favor smoother forms and avoid diagonal pixels
for improved readability.

All in all, I think the font is nearly readable now but I might increase the
width in the future.

The updated sprite sheet for just the font is about 128px x 64px including a 1
px padding at a power of two sizing (appears out of order to packing):

<a href=mem-font-2019-10-01.png><img src=mem-font-2019-10-01.png></a>

I noticed today that the
[mem-font GitHub project](https://github.com/rndmem/mem-font), which is the
predecessor to the letter forms used in the game and to which I haven't made
changes to in over two years, now has FIVE fancy boi stars so I hope to push
these Nature Elsewhere font changes back to the upstream repo one fine day and
maybe give that whole project a rework.

## aseprite-atlas

I've moved the Aseprite parsing, animation, and collision boxing code to a new
reusable TypeScript library,
[aseprite-atlas](https://github.com/oddoid/aseprite-atlas). In summary, the
library parses and coalesces all animation data together into a simple data
structure and provides some utilities for animating. I think it's in fair shape.
I'm still working on a standalone demo but the functional code seems broadly
useful and hasn't changed much in months so I hope the library will find use
elsewhere.

## The Natural Engine, Entity Subsystem, and In-game Level Editor

So I can feel better about the all the "spare time" I've put into it, I'm going
to start calling the game engine I seem to be building by a handsome name, maybe
"the natural engine." Don't let the name fool you though, it's hellishly
_unnatural_ and the kind of engine that dies and refuses to start just around
the time you lose cellphone coverage on the way to a job interview. Well, maybe
a name I'll use just for this post.

Regardless of the name, I learned bunches about and made many improvements to
that engine. This work was primarily driven by the necessities uncovered in
development of the in-game level editor which now appears as:

<a href=20191001-2356dfc-editor.png><img src=20191001-2356dfc-editor.png width=704></a>

The level editor's status is:

- Very clunky. No drag and drop yet and no way to pick between stacked objects.
- All the buttons are finally functional: decrease, increase, destroy, create,
  and toggle grid.
- Technically works on mobile if your meat wigglers are slim enough.
- No save option yet.
- Lots to improve upon.

Those level editor icons took ages, by the way, particularly the create icon
which is intended to read as a flower. I probably should have settled on the
sizing before digging in. Oh well.

It does and it doesn't feel like a lot of progress has been made. There's lots
of infrastructure changes that I think were necessary. Most significantly, the
level editor highlighted a number of design limitations in the natural engine's
entity subsystem. For example, in previous iterations, it was possible to group
entities and position them relative to each other:

<a href=20190624-057378d-settings.png><img src=20190624-057378d-settings.png width=704></a>

This prior functionality was pretty important for very basic UI, such as the
toolbar and even the simple title screen, but was left behind when migrating to
an entity subsystem that better separated configuration data from code.
Similarly, the prior system had better support for composing entities (via code
not configuration) while the replacement system only had good support image
compositions. For me, the parallels in requirements for even toy UI and modern
UI libraries were striking.

The solution I pursued was to implement an entity subsystem with recursive
support. That is, each entity can have children that are also entities and when
an entity is moved, all of its children move too. This functionality is
available from the configurations that are parsed through transformations,
updates, state changes, the collision subsystem, and more.

The entity subsystem quite unsurprisingly is at the heart of the natural engine,
but it wasn't something I gave serious enough consideration to previously. I
guess because it felt more implementation agnostic than other features like
graphics, audio, or physics and I figured in my little brain that if I could
program data structures, it would just come together naturally without too much
thinking. I was so wrong. This is _the_ architecture.

Keeping entity configuration data and code separate has been working very well.

The entity subsystem will need lots more work but it's been quite interesting
now that I recognize its importance and understand some of the problems it needs
to solve.

I tried really hard not to build one but all this work in the natural
engine--custom UI, isometric WebGL rendering, collisioning, an in-game level
editor, and more, it's been kind of wild. Very challenging but fun and slowly
rewarding. I feel like I'm in college giving it my all.

## TypeScript

Wow, TypeScript really is amazing. I can't imagine doing the refactors I've done
this past month without it. I'm now a believer.

I do think there's a big learning curve though for scratch projects that don't
lean on an existing framework of thought for how to pattern the code. I've
wasted so many days trying different approaches and I'm still unsatisfied. Part
of the issue is that there are some inherent limitations in the language that
are not obvious and are big time sinks where one tries to figure out if they're
misusing the language or not. Combined with the other complexities of a game and
it's proven quite difficult.

I'm still struggling with system design in a big way. However, given the number
of rewrites I've done so far, I've increasingly valued rather plain and blunt
implementations, that are extensible, written as simply as possible, and easy to
read and reason about. I've never been very good at holding a project in my head
overnight so I've increasingly been writing for the idiot that comes in in the
morning. Easier said than done but making new features obvious is the hope for
the new entity subsystem especially.

### Import Loops

Import cycles keep coming up in my recursive parsers. I keep hacking around them
as they have surfaced during other major refactors but I hope to look into this
more seriously and fix properly.

### References

I am looking for relevant TypeScript project references. I think the compiler
isn't so applicable.

### Shipping Library Types

The mechanism for this feels a little awkward. Producing the actual outputs,
either via tsc directly or Webpack, is where TypeScript feels a little unfun to
me.

## Prettier

I've said it before but it continues to amaze me how the Prettier formatter has
changed the way I write and improved my quality of life. Code becomes less
surprising and far easier to read at no cost after Prettier sweeps through. I
can't believe how impactful and magical it is.

## oddoid

I've decided to revise the name from rndmem to oddoid. I don't think I'm quite
happy with either but domain bandits captured my first choice days before I
realized it. What a terrific waste of time.

## Levels

Levels have much better form now. In general, configurations and parsing is far
more rational than its ever been before. The prior level state machine logic for
transitioning between levels is mostly there with the notable exception that you
can't go back.

The new title screen is up and it doesn't make me entirely unhappy. I like that
it's simple but also miss the old look a little. I'm not sure what will live in
options / settings so I'm avoiding that for now and mostly focused on the level
editor.

## Input Subsystem

I've torn out the whole input subsystem including all the virtual joystick work.
It saddens me but the API was cumbersome and I don't really know what I was
aiming for. I just made a dumb pointer replacement and will readdress as needed.
A willingness to start over is an incredible asset.

## Device Support

A big recent change in project vision has been to focus on pointers as a common
denominator that will work on mobile and desktop. This has big design and
technical implications. However, somehow, iOS only supports WebGL v1 so I may
need to downgrade if that's not fixed before the game is out.

## Graphics

I've restored masking support. This enables the color of one image to appear the
alpha mask of another. It's only used for font coloring presently and could be
removed if needed.

## Updates

Updates now percolate through the system with a big honking god object called an
UpdateState that contains the greatest hits for state changes and a little more
including tick delta, camera, player and active entities. I wouldn't want to
have to test any code that consumes one directly but its sure been nice not to
have to constantly rethread changing dependencies in and out of the system.

## Rounding Errors, Floats, Integers, and Encapsulation

Fractional numbers are unfriendly to pixel art. A recurring problem in the
project has been weird pixel glitches and these have often been rooted in
rounding errors.

One of the worst issues came up this past month in that I wanted to allow
subpixel velocity aggregation and didn't realize that introducing a single
source of non-integer values would spread through the system like an infection
and eventually cause what appear to be quite sporadic errors that usually
manifested visually.

Although I had been careful, I also had a feeling that there were countless
fractional numbers creeping in and I wasn't sure what to do about it. In C, I
would have just used integer types from the beginning and it never would have
been a problem but JavaScript only has number, typed arrays, and BigInt which
each have their own tradeoffs. I chose number and just tried to use integer
values and manual truncation. I felt as if I had built a house with bad bricks.

Most of the numbers in the game are stored in XY and WH types which were defined
as `{x: number, y: number}` and `{w: number, h: number}`. In other words, just
data without any encapsulation. I decided to experiment with replacing these
data interfaces with classes that use getters and setters with the latter having
an integer value check like `if (!Number.isInteger(x)) throw new Error()`. It
g/setter syntax required only changes to the constructor and it worked kind of
way better than expected. I was equally stunned by the effect on the code and my
mental state. The power of this approach has given me lots to think about.

## Pixel Perfect

In general, keeping a responsive and as close to pixel perfect as possible
render has been very important to my vision for the project. That is, make full
use of the screen space available but honor the pixel. Just know what approach
to pursue has been challenging but it was largely due to this strong interest
that drove me to build my own engine.

Many modern retro games take a different approach which is often to render large
blocky pixel art sprites in a very high resolution scene and I think the feeling
is very different. For me, I think pixel art is quite unique in that pixels are
digital, on or off and nowhere in between, and there's no blurriness unlike the
real world. I think this perfect clarity is profound and so have endeavored to
keep true to this wonderful property as much as possible for all visual matters.

The latest consequence is that the camera really snaps from pixel to pixel and
it feels quite toothy. I think I'm comfortable with that. However, one thing I
found was that keeping diagonal camera movements in sync across x and y axes was
important to avoid a very jarring experience so there is special code for it.

I remain uncertain whether scaling should vary from level to level. I think it
will work.

Those are my feelings so far anyway. I hope it plays well and compromises can be
avoided.

## Content

Unfortunately, there has been very little time for art and content changes in
September. I am optimistic the level editor will enable efficient and effective
level designs and that the entity subsystem changes will make many entity
implementations mostly obvious even when distractions are greater.

I've been checking [Pixel Joint](https://pixeljoint.com) to keep my inspiration
up most days and spent the summer trying to internalize scenes of nature I came
upon.

### Isometric

I've been extremely pleased with the unexpected isometric direction the game has
taken but continue to find it challenging to draw. I think it really helps solve
the atmosphere problems I anticipated and works really well.

## Work

I always have lots of doubts about the project. Is it worthwhile? Is the code
too lousy even for a hobby or [lover of](https://wikipedia.org/wiki/Amateur)?
Will the project be stolen? Will it be fun? Less so now than last year at least.
As a personal project, my failures are my own and there is no recompense for
self-deception.

My grandfather always told me that the secret to life is work. Even for fun, I
think that's so true for many reasons. There is such a big difference between
talking about all the neat things one would like to build and actually doing it.
The former is nearly effortless. The latter can really take some doing and hard
work. Even then, it may not work. I've found it difficult to work in earnest but
that's all part of it.

Further, by nature, I am a lazy and intuitive thinker but I am slowly changing.
In technical school, a classmate told me they could visualize a picture so
perfectly but couldn't put it paper once it came time to draw it. I felt the
same way until I was tasked to draw a human nose and finally realized, despite
this feeling of perfect visage, I had no idea what a nose _really_ looked like.
So I worked at it. I can't draw noses or much else any more but for a time it
was my specialty if so ever I had one. I think this level of clarity can only be
found in work and there's no substitute for it. Everything else in life is
theoretical. Success is work's achievement and a great fruit.

For this project, I've also found it challenging to wear so many hats and to
balance planning and doing or even that so very important thing to have a real
vision. Even effective notekeeping has been a challenge. It's hard to know the
difference between doodling and planning some times. Working smart is hard work.

I hope to get to a point in the project where a single level is reasonably
polished and feature complete. I'm far from that point but, to me, this would
mean that few unknown unknowns remain and, with hard work, completion is an
inevitably not only a possibility. I think that will be a really exciting
feeling. For now, work remains daunting and the risk of starting over or failure
feels high.

## Closing

The end is nowhere in sight but I'm enjoying the progress I've made recently.
That said, I'm looking forward to taking some time off for November holidays,
setting up a media center with the latest Ubuntu, and playing some games. I am
grateful for the now, being able to get into deep thought and flow of work has
been invaluable to my productivity and sense of well-being, but I likely have
quite challenging professional work coming in November and I expect development
to nearly halt because of it. I shall try to work earnestly.
