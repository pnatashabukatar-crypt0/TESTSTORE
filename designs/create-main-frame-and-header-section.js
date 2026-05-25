async function createDesign() {
  const page = figma.currentPage;
  
  // Create main root frame
  const rootFrame = figma.createFrame();
  rootFrame.name = "Root Frame";
  rootFrame.resize(1280, 1600);
  rootFrame.x = 0;
  rootFrame.y = 0;
  rootFrame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  page.appendChild(rootFrame);
  
  // Create header frame
  const headerFrame = figma.createFrame();
  headerFrame.name = "Header";
  headerFrame.resize(1280, 80);
  headerFrame.x = 0;
  headerFrame.y = 0;
  
  // Set header background color (dark blue)
  headerFrame.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.2, b: 0.4 }, opacity: 1 }];
  
  // Enable auto-layout for header
  headerFrame.layoutMode = "HORIZONTAL";
  headerFrame.primaryAxisAlignItems = "CENTER";
  headerFrame.counterAxisAlignItems = "CENTER";
  headerFrame.itemSpacing = 16;
  headerFrame.paddingLeft = 24;
  headerFrame.paddingRight = 24;
  headerFrame.paddingTop = 0;
  headerFrame.paddingBottom = 0;
  
  // Add header to root frame
  rootFrame.appendChild(headerFrame);
}
createDesign().catch(e => console.error(e));