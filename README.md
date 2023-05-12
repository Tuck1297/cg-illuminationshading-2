<div align="center">
  <h1>3D Illumination and Shading using the HTML5 WebGL2 API</h1>
  <img src="https://github.com/Tuck1297/tuck1297.github.io/blob/master/Media/phong-shading-cg-ev1.JPG"/>
</div>

## Project Overview

This project focuses on integrating lighting and textures in a 3D Virtual Environment. Simply, this project initializes a virtual environment in the web browser using the web standard called WebGL (Web Graphic Library). The oversimplification of this project comes down to developing two individual programs that interface with the GPU called shaders. These shader programs allow the efficient rendering of close to real life looking graphics. To see specifics of this project dive deeper into the section below.  

## Behind the Scenes Walkthrough

This project's main purpose was to learn about the process in which using the WebGL API to map textures and simulighting in a virtural environment. The input data for this application consists majorily of data formatted in Json with textures being JPG image file format. The following is a simple walkthrough of what happens behind the scenes in setting up a 3D environment using WebGL's API. 
1. The web application loads a WebGL context, which initializes the necessary resources and sets up the rendering environment. This context provides access to the WebGL API and allows the application to communicate with the GPU (Graphics Processing Unit) of the device the program is being run on. 
2. The application then loads the vertex and fragment shaders (more about these below) which handle converting the vertexes and fragments of the 3D scene into a 2D representation which can be mapped to each pixel on the computer monitor. 
3. The application then loads the 3D object models (in this case build programically through initializeing Json variables) and passes them to the GPU. 
4. Then based on what is programmed, the WebGL application sets up the camera and the lighting for th scene, as well as other visual effects, such as shadows, reflections and transparency. 
5. The application then renders the scene by calling the WebGL API functions, which send the vertex and fragment shader programs to the GPU. The GPU then processes the data and generates the final image that is displayed on screen. 
6. Finally, the application listens for user input (in this case it keyboard keys or controls on the webpage) and updates the scene accordingly, by changing the position, rotation, size or other properties of the 3D objects. 

### More about Shaders

Using WebGL2's API, this project generates 3-Dimensional shapes and lighting in a 2-Dimensional view. In terms of the textures and lighting there are two programs that work directly with the GPU that handle the calculation from data to the virtual environment. They are the following:

- Vertex Shader
  Between the two shaders the vertex shader is executed by the GPU first. It is a program that runs for every vertex or point in a 3D object or scene. Its main function is to transform the 3D coordinates of the vertices into 2D screen coordinates so that the object or scene can be rendered on a 2D screen. In addition, the vertex shaders can also perform other operations on each vertex, such as scaling, rotating, or coloring it. One common example is simulating a blur effect in computer graphics.  
  
- Fragment Shader
  The fragment shader is then implemented after the vertex shader and runs for every fragment on the screen that the object or scene is being rendered onto. The main function of the fragment shader is to determine the color of each pixel on the screen based on the lighting and other visual effects applied to the object or scene. Instagram's filters applied to various kinds of photos is a perfect example of a fragment shader at work. 
  
Although the vertex and fragment shaders have different operations, they need each other in order to successfully render a 3D scene to a 2D screen.  

In terms of WebGL, the fragment and vertex shaders are coded using a C like language called OpenGL Shading Language (GLSL) which is a high level language designed specifically for creating shaders in OpenGL and WebGL graphics APIs. Some of the features that are similar to C include Loops, Conditions, Vector operations and Matrix operations. These shaders developed using GLSL, when used, are compiled into a low-level binary code that can be executed by the GPU. 

## More about Lighting

This project implements two different and widely used ways light interacts with 3D objects in the virtual 3D environment. 

- Gouraud shading
Gouraud shading calculates shading at the verticies of a polygon mesh and then interpolates the colors across the surface of each polygon. In this method, the color of each vertex is calculated using the lighting model, which takes into account the position and intensity of light sources, the surface normal of each vertex and the material properties of the object. Then the colors at the vertices are interpolated across the surface of each polygon to produce a smooth shading effect. Gouraud shading is computationally efficient and can produce good results for smooth surfaces. 

- Phong shading
Phong shading calculates shading at each point on the surface of an object by interpolating the surface normal vectors across each polygon. In this method, the normal vector at each point on the surface is calculated by interpolating the normal vectors of the vertices of the polygon. The lighting model is then applied to the interpolated normal vectors to calculate the color and intensity of light each point on the surface. Phong shading can produce more accurate and realistic shading than Gouraud shading, especially for curved surfaces, but it is more computationally expensive. 

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

#### JSON environment instructions

If you want to develop your own virtual environment inside this project you will need to define the following properties in a Json file: 
- background - REQUIRED ~ color of background [Red, Green, Blue]
- camera - REQUIRED
    - position - REQUIRED ~ [x, y, z]
    - target - REQUIRED ~ location in scene that camera is looking [x, y, z]
    - up - REQUIRED ~ vector pointing in camera's up direction [0,1,0] (default values)
- models
    - type - REQUIRED ~ options are plane, sphere, cube, star, custom, pin or blender_model
    - shader - REQUIRED ~ options are color or texture. Texture is selected if you have a texture you want to apply to the model and color if you only have a color you want to apply to the model
    - material - REQUIRED
      - color - REQUIRED ~ color you want to set model to [Red, Green, Blue]
      - specular - REQUIRED ~ specular highlights on the surface of the object [Red, Green, Blue]
      - shininess - REQUIRED ~ size and sharpness of specular light on the object surface. Integer value
    - texture - OPTIONAL ~ only need if set shader property above to texture
      - url - REQUIRED ~ path to texture to map to model ex. "images/texture.jpg" ~ only jpg images are supported at this time
      - scale - REQUIRED ~ ???
    - center - REQUIRED ~ center of object [x, y, z]
    - size - REQUIRED ~ size of the object [width, height, depth]
    - rotate_x - OPTIONAL ~ in degrees - if include this one, need to include other two
    - rotate_y - OPTIONAL ~ in degrees - if include this one, need to include other two
    - rotate_z - OPTIONAL ~ in degrees - if include this one, need to include other two
- light - REQUIRED
    - ambient - REQUIRED ~ 3D environment non-directional light [Red, Green, Blue]
    - point-lights - REQUIRED ~ an array of lights to populate in the scene. There can be no more than 10
      - position - REQUIRED ~ Position of light [x, y, z]
      - color - REQUIRED ~ Color of light [Red, Green, Blue]

this is where hosting instructions locally or working with launched version will go

---

## Controls

There are some controls not listed on the site to allow one to move around the projection. Here are the following: 
- Left Arrow Key: Rotate Left
- Right Arrow Key: Rotate Right
- A Key: Shift left
- D Key: Shift right
- W Key: Move Forwards
- S Key: Move Backwards

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

