async function createDesign() {
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  const page = figma.currentPage;

  // Create header frame
  const headerFrame = figma.createFrame();
  headerFrame.name = "Header";
  headerFrame.x = 0;
  headerFrame.y = 0;
  headerFrame.resize(1280, 80);
  headerFrame.fills = [{ type: "SOLID", color: { r: 0.545, g: 0.267, b: 0.075 } }];
  page.appendChild(headerFrame);

  // Add header title
  const headerTitle = figma.createText();
  headerTitle.name = "Header Title";
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  headerTitle.fontName = { family: "Inter", style: "Bold" };
  headerTitle.fontSize = 32;
  headerTitle.characters = "Book Store";
  headerTitle.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  headerTitle.x = 40;
  headerTitle.y = 20;
  headerFrame.appendChild(headerTitle);

  // Create featured books section frame
  const sectionFrame = figma.createFrame();
  sectionFrame.name = "Featured Books Section";
  sectionFrame.x = 0;
  sectionFrame.y = 80;
  sectionFrame.resize(1280, 500);
  sectionFrame.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.96, b: 0.93 } }];
  page.appendChild(sectionFrame);

  // Create section title
  const sectionTitle = figma.createText();
  sectionTitle.name = "Section Title";
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  sectionTitle.fontName = { family: "Inter", style: "Bold" };
  sectionTitle.fontSize = 28;
  sectionTitle.characters = "Featured Books";
  sectionTitle.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];
  sectionTitle.x = 40;
  sectionTitle.y = 30;
  sectionFrame.appendChild(sectionTitle);

  // Create grid container frame
  const gridFrame = figma.createFrame();
  gridFrame.name = "Books Grid";
  gridFrame.x = 40;
  gridFrame.y = 100;
  gridFrame.resize(1200, 350);
  gridFrame.fills = [];
  gridFrame.strokeWeight = 0;
  sectionFrame.appendChild(gridFrame);

  // Calculate spacing for 3 books
  const bookWidth = 250;
  const bookHeight = 350;
  const totalBooksWidth = bookWidth * 3;
  const availableWidth = 1200;
  const totalGapWidth = availableWidth - totalBooksWidth;
  const gapBetweenBooks = totalGapWidth / 4;

  // Create 3 book cover placeholders
  const bookCovers = [
    { name: "Book 1", color: { r: 0.831, g: 0.647, b: 0.455 } },
    { name: "Book 2", color: { r: 0.8, g: 0.6, b: 0.4 } },
    { name: "Book 3", color: { r: 0.85, g: 0.67, b: 0.47 } }
  ];

  bookCovers.forEach((book, index) => {
    const bookRect = figma.createRectangle();
    bookRect.name = book.name;
    bookRect.x = gapBetweenBooks + (index * (bookWidth + gapBetweenBooks));
    bookRect.y = 0;
    bookRect.resize(bookWidth, bookHeight);
    bookRect.fills = [{ type: "SOLID", color: book.color }];
    bookRect.strokeWeight = 2;
    bookRect.strokes = [{ type: "SOLID", color: { r: 0.545, g: 0.267, b: 0.075 } }];
    gridFrame.appendChild(bookRect);

    // Add book title text
    const bookTitle = figma.createText();
    bookTitle.name = `${book.name} Title`;
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    bookTitle.fontName = { family: "Inter", style: "Regular" };
    bookTitle.fontSize = 14;
    bookTitle.characters = book.name;
    bookTitle.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];
    bookTitle.x = gapBetweenBooks + (index * (bookWidth + gapBetweenBooks));
    bookTitle.y = bookHeight + 10;
    gridFrame.appendChild(bookTitle);
  });
}
createDesign().catch(e => console.error(e));