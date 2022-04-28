# 3D Illumination and Shading

## 3D Illumination and Shading starter code using the HTML5 WebGL2 API

### Illumination and Shading (to earn a C: 45 pts)
- [x] Implement Gouraud shading: 20 pts
  - Shaders: gouraud_color.vert / gouraud_color.frag
  - Only need to handle first point light source
- [x] Implement Phong shading: 20 pts
  - Shaders: phong_color.vert / phong_color.frag
  - Only need to handle first point light source
- [] Create your own custom model type (beyond the provided plane, cube, and sphere): 5 pts
### Additional features (to earn a B or A)
- [] Implement texture mapping: 10pts
  - Allow for tiling textures
  - Usable with both Gouraud and Phong shading
  - Custom model should include texture coordinates
- [] Enmable multiple point lights to illuminate a scene: 5 pts
  - Maximum of 10 lights - will need to change the light in the shaders to an array of lights (with size = 10)
  - Make sure to cap color intensity at 1.0
