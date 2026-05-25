async function createDesign() {
  const page = figma.currentPage;
  
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  
  const heroFrame = figma.createFrame();
  heroFrame.name = "Hero Section";
  heroFrame.resize(1280, 400);
  heroFrame.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.2, b: 0.4 } }];
  heroFrame.y = 80;
  
  const headline = figma.createText();
  headline.fontName = { family: "Inter", style: "Bold" };
  headline.characters = "Welcome to Our Platform";
  headline.fontSize = 48;
  headline.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  headline.x = 60;
  headline.y = 40;
  heroFrame.appendChild(headline);
  
  const subheading = figma.createText();
  subheading.fontName = { family: "Inter", style: "Regular" };
  subheading.characters = "Discover amazing features and transform your workflow";
  subheading.fontSize = 18;
  subheading.fills = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
  subheading.x = 60;
  subheading.y = 120;
  heroFrame.appendChild(subheading);
  
  const ctaButton = figma.createFrame();
  ctaButton.name = "CTA Button";
  ctaButton.resize(200, 56);
  ctaButton.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.7, b: 0.9 } }];
  ctaButton.x = 60;
  ctaButton.y = 200;
  ctaButton.cornerRadius = 8;
  heroFrame.appendChild(ctaButton);
  
  const buttonText = figma.createText();
  buttonText.fontName = { family: "Inter", style: "Bold" };
  buttonText.characters = "Get Started";
  buttonText.fontSize = 16;
  buttonText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  buttonText.x = 50;
  buttonText.y = 18;
  ctaButton.appendChild(buttonText);
  
  page.appendChild(heroFrame);
}
createDesign().catch(e => console.error(e));