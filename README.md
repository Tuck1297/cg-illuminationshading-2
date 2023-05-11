<div align="center">
  <h1>3D Illumination and Shading using the HTML5 WebGL2 API</h1>
  <img src="https://github.com/Tuck1297/tuck1297.github.io/blob/master/Media/phong-shading-cg-ev1.JPG"/>
</div>

## Project Overview

This project focuses on integrating lighting and textures in a 3D Virtual Environment. Simply, this project initializes a virtual environment in the web browser using the web standard called WebGL (Web Graphic Library). The oversimplification of this project comes down to developing two individual programs that interface with the GPU called shaders. These shader programs allow the efficient rendering of close to real life looking graphics. To see specifics of this project dive deeper into the section below.  

## Behind the Scenes Walkthrough

This project's main function is to provide a hands-on experience in creating and managing data that will be converted to filled out 3-Dimensional shapes, mapping textures to shapes and simulating two common ways to simulate lighting in computer graphics. 

Using WebGL2's API, this project generates 3-Dimensional shapes and lighting in a 2-Dimensional view. In terms of the textures and lighting there are two programs that work directly with the GPU that handle the calculation from data to the virtual environment. They are the following: 
- Fragment Shader
  The Fragment Shader...
- Vertex Shader
  The Vertex Shader...

---

## Highlights of this Project

- Implement Gouraud shading
  - Shaders: gouraud_color.vert / gouraud_color.frag
  - Only need to handle first point light source
- Implement Phong shading
  - Shaders: phong_color.vert / phong_color.frag
  - Only need to handle first point light source
- Create your own custom model type (beyond the provided plane, cube, and sphere)
- Implement texture mapping
  - Allow for tiling textures
  - Usable with both Gouraud and Phong shading
  - Custom model should include texture coordinates
- Enmable multiple point lights to illuminate a scene
  - Maximum of 10 lights - will need to change the light in the shaders to an array of lights (with size = 10)
  - Make sure to cap color intensity at 1.0

--- 

## Plug and Play

### Try out this project here: [Illumination Shading](https://tuck1297.github.io/cg-illuminationshading-2/)

If you are interested in building your own 3D Environments in this project...

This is where the specs for this project will go. 

---

## Controls

There are some controls not listed on the site to move around the projection. There are the following: 
- list 1
- list 2
- list 3
- list 4

---
## Tools and Languages Used
<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="60"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="60"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="60" height="60"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" **alt="Git" width="60" height="60"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/github/github-original.svg" title="Github" **alt="Github" width="60" height="60"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/vscode/vscode-original.svg" title="vscode" **alt="vscode" width="60" height="60"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/WebGL_Logo.svg/1920px-WebGL_Logo.svg.png" title="WebGL" **alt="WebGL" height="60" />
</div>

