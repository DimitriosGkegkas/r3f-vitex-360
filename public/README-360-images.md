# 360-Degree Images for the Project

## Supported Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- HDR (.hdr)

## Image Requirements
- **Resolution**: Recommended minimum 2048x1024 pixels
- **Aspect Ratio**: 2:1 (equirectangular projection)
- **File Size**: Keep under 10MB for optimal performance

## How to Add Images
1. Place your 360-degree image in the `public/` folder
2. Update the `imageUrl` prop in `src/App.tsx` to point to your image
3. Example: `imageUrl="/your-image-name.jpg"`

## Current Placeholder
The app currently uses `/sample-360-image.jpg` as a placeholder. Replace this with your actual 360-degree image.

## Tips for Best Results
- Use equirectangular projection format
- Ensure the image wraps seamlessly at the edges
- Test the image in a 360-degree viewer before adding to the project
- Consider using HDR images for better lighting and realism
