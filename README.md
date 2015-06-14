# Wellcome to Hippo Project

This project uses the <a href="http://www.createjs.com/" target="_blank">CreateJS</a> Framework to handle HTML5 canvas element.

The project has some files in order to run on <a href="https://www.heroku.com/" target="_blank">Heroku</a> as a Node js http server, but Node js is not required by the project (any http server should work), the app is client-side only.

So you can do whatever you want with this files:

+ Procfile
+ package.json
+ requestHandlers.js
+ router.js
+ server.js
+ web.js

to run it with Node js just type the following command shell over the app folder

```bash
$ node web.js
```

## About

Our goal is to help to improve learning of lecture and writing on children with special needs through serious games.

## Technical Details

The project is designed to work with the information in the scene's config file, each scene has his own game mechanics and it's meant to use the information on those files to create a playable level.

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
As you can see in this Json file we have an array, it has the information of a level in each one of his positions, let's explain each key and value,

> Value information below is about the level itself

*key* | *value*
--- | ---
backg | path of background image
img | array of image's information (js objects)
*img/src* | path of the image
*img/scale* | image size according to screen size
position | array with different positions that images can take

in the example above we have used a non sprite file, but we can combine both type in the same level just adding the extra information that a sprite needs as follows

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
to see what's happening here please watch this CreateJS class: <a href="http://www.createjs.com/docs/easeljs/classes/SpriteSheet.html" target="_blank">SpriteSheet</a>

We are still working hard on it (scene 2 isn't yet) we miss a designer help so please be kind, feel free to visit us and see what's going on.
<a href="http://fathomless-journey-9978.herokuapp.com/" target="_blank">Hippoapp</a>
