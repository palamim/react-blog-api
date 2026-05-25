---
title: 'Notes on starting to use Claude Code'
description: 'Notes on starting to use Claude Code.'
pubDate: 2026-04-28
---

I admit. I held out on <mark>Claude Code</mark> longer than I should have.

I'm a stubborn man. Especially when it comes to stuff I'm good at. A new tool shows up that makes my life easier? I'll try to prove I don't need it. I'll show everyone I'm an old-school genius who can do it the hard way.

- LLMs available through APIs as a service? No, I'll keep running models locally.
- Obsidian for notes? No, I'll keep writing on paper.

That was me with Claude Code. I told myself I was the only one who could navigate my own projects, knowing every folder, every component, every dependency in depth.

Today I gave in. I couldn't keep watching the volume of work (and content) being produced with Claude Code and pretend it didn't matter.

I built this website in Astro. It's a new framework for me (old-school React programmer here), lightweight, very fast. The template I started from came with a Mastodon icon I wanted to replace. The original code was an SVG inside an anchor tag, link pointing to a Mastodon profile. Perfect scenario for my first Claude Code test.

I gave it a single prompt:

```
> hey claude, can you look inside src/components/Footer.astro and
see if you can change the svg of the mastodon to a linkedin one?
```

It found the file. Replaced the SVG with a clean LinkedIn icon. Not satisfied, it went further and updated the `href`, and somehow inferred the correct URL for my [LinkedIn](https://www.linkedin.com/in/leopalamim/) profile. I still don't know where it pulled that from. Positively surprised.

The change took maybe 15 seconds of my time. The prompt was casual, almost lazy, just to test it out.

> First impression: this is a different kind of tool than I was expecting. Not an in-editor AI helper. Closer to having a competent programmer working alongside you.

More notes as I keep using it.
