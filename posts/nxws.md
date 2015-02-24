⦿ News As It Happens
----------------------------
    Tuesday, 24 February 2015

A simple news feed aggregator I've been working on. I'm still polishing up the interface
but it's quite useable, at least locally.

Just load it up and wait for something interesting to come in. The feeds are located in
a .json file and once running you can filter the feed using the input on the right, creating tags as you go.

![A screenshot of a new feed aggregator](./images/newscow.png "News Feed Aggregator")

Technically, it's a Node.js backend that will periodically refresh from a given set of feeds.
These are then rendered in the client using Facebook's [React](http://facebook.github.io/react/)
framework.

All communication happens via [Socket.io](http://socket.io), and for a bit of fun,
the number of current readers is broadcast to everyone.

