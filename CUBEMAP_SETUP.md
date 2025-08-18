# Cubemap Setup Guide for 360° Viewer

## Overview
The drei Environment component can work with cubemap arrays, which provide better performance and quality than single HDR files. A cubemap consists of 6 images representing the 6 faces of a cube.

## File Structure
Create a folder structure like this in your `public` directory:

```
public/
  cubemap/
    px.jpg  # positive X (right face)
    nx.jpg  # negative X (left face)
    py.jpg  # positive Y (top face)
    ny.jpg  # negative Y (bottom face)
    pz.jpg  # positive Z (front face)
    nz.jpg  # negative Z (back face)
```

## Face Orientations
- **px.jpg** (Right): Looking towards positive X axis
- **nx.jpg** (Left): Looking towards negative X axis
- **py.jpg** (Top): Looking towards positive Y axis (sky)
- **ny.jpg** (Bottom): Looking towards negative Y axis (ground)
- **pz.jpg** (Front): Looking towards positive Z axis
- **nz.jpg** (Back): Looking towards negative Z axis

## How to Create Cubemap Photos

### Option 1: Using Photo Editing Software
1. Take a 360° photo or use an existing equirectangular image
2. Use software like Adobe Photoshop, GIMP, or specialized tools to convert to cubemap
3. Export as 6 separate images with the naming convention above

### Option 2: Using Online Tools
- **HDRLabs**: https://www.hdrlabs.com/pano2vr/
- **Pano2VR**: Professional tool for panorama conversion
- **Online converters**: Various web-based tools can convert equirectangular to cubemap

### Option 3: Manual Photography
1. Set up a camera on a tripod
2. Take 6 photos in a 90° pattern (front, right, back, left, up, down)
3. Ensure each photo covers exactly 90° of view
4. Name them according to the convention above

## Usage in the Component
The component automatically detects cubemap folders and sets up the environment:

```typescript
// When you pass "/cubemap" as imageUrl, it will automatically use:
<Environment 
  files={[
    "/px.jpg", "/nx.jpg", "/py.jpg", "/ny.jpg", "/pz.jpg", "/nz.jpg"
  ]}
  background={true}
  resolution={512}
/>
```

## Benefits of Cubemaps
- **Better Performance**: Faster loading and rendering
- **Higher Quality**: No distortion at the poles
- **Easier Editing**: Individual faces can be edited separately
- **Better Compression**: Each face can be optimized independently

## Tips
- Use consistent resolution for all faces (e.g., 1024x1024)
- Ensure seamless edges between adjacent faces
- Test the orientation by viewing in the 360° viewer
- Consider using JPG for photos and PNG for graphics with transparency

## Example Workflow
1. Take a 360° photo with your phone/camera
2. Convert to cubemap using your preferred tool
3. Place the 6 images in `public/cubemap/`
4. Use `/cubemap` as the `imageUrl` in your component
5. The environment will automatically load all 6 faces
