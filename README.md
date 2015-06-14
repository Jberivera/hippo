# Wellcome to Hippo Project

This project uses the [CreateJS][1] Framework to handle an HTML5 `<canvas>` element.

The project has some files in order to run over the [Heroku][2] platform as a [Nodejs][3]/[iojs][4] http server, nevertheless Nodejs/iojs is not required by the project (any http server should work), since the app is client-side only.

So, you can do whatever you want with this files:

+ Procfile
+ package.json
+ requestHandlers.js
+ router.js
+ server.js
+ web.js

to run it with Nodejs/iojs just run the following shell command over the app folder

```bash
$ node web.js
```

## About

Our goal is to help to improve learning of reading and writing on children with special needs through serious games.

## Technical Details

This project is designed to work with the information in the scene's config file, each scene has his own game mechanics and it's meant to use the information on those files to create a playable level.

#### Let's see an example

> config/scene1-config.json

```json
[
  {
    "backg": "assets/scene1/1/backg/landscape.svg",
    "img": [
      {
        "src": "assets/scene1/1/img/reindeer.svg",
        "scale": 0.0005
      }
    ],
    "position": [
      {
        "x": 0.05,
        "y": 0.45
      },
      {
        "x": 0.1,
        "y": 0.7
      }
    ]
  },
  {
    "This is the next object on array": "so this is the next level"
  }
]
```
As you can see in this JSON file we have an array, it has the information of a level in each one of his positions, let's explain each key and value,

> Value description below is about a level itself

*key* | *value*
--- | ---
`backg` | path to background image
`img` | array of image's information (JS Objects)
`*img/src*` | path to the image
`*img/scale*` | image size according to screen size
`position` | array with different positions that images can take

In the example above we have used a non sprite file, but we can combine both types in the same level just adding the extra information that a sprite needs as follows

> note that add this object to img's array is what we meant to do, but for readability purposes we are not going to repeat the same code above.

```json
{
  "src": "assets/scene1/1/img/Aguila.png",
  "scale": 0.00035,
  "sheet": {
    "animations": {
      "idle": [0, 4, "idle", 0.2],
      "done": [5, 9, "done", 0.5]
    },
    "frames": {
      "regX": 90,
      "regY": 85,
      "height": 709,
      "width": 569,
      "count": 10
    }
  }
}
```

To see what's happening here please watch this CreateJS class: [SpriteSheet][5]

We are still working hard on it (scene 2 isn't ready yet) but we miss a designer help so please be kind, feel free to visit us and see what's going on. [Hippoapp][6]


[1]: http://www.createjs.com/                                         "CreateSJ Framework"
[2]: https://www.heroku.com/                                          "Heroku"
[3]: https://nodejs.org/                                              "Nodejs"
[4]: https://iojs.org/en/index.html                                   "iojs"
[5]: http://www.createjs.com/docs/easeljs/classes/SpriteSheet.html    "EaselJS - SpriteSheet Class"
[6]: http://fathomless-journey-9978.herokuapp.com/                    "HippoApp on Heroku"
