# Youtube multi downloader - node.js

Download multiple youtube videos easily.

- Recommended Node version 16.11.0

## Install ⚙️

```
npm install
```

## Input file

Create `videos.json` with input files following the structure:

```json
{
  ".": [
    "https://youtu.be/L5ZL84PHiTY"
  ],
  "folder": [
    "https://youtu.be/dQw4w9WgXcQ"
  ],
  "f2": {
    "f1": [
      "QH2-TGUlwu4"
    ]
  },
  "playlists": [
        "https://www.youtube.com/playlist?list=PLbAFXJC0J5GYVLLnjullmZ2NuG6ay-SXw"
  ]
}
```

All videos urls must be placed in arrays, all folder structure must be declared inside objects.

The playlists folder is a exception: it has a fixed structure to be declared at runtime, so it expects a Array of playlists url or ids.

## Run 🚀

```
npm start
```