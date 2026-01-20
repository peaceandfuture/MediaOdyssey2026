let brushColor;
let brushSize;
let shapeMode = 'standard';
let points = [];
let shapes = [];
let tempPoints = []; // 곡선 입력 시 임시 저장할 점
let presetColors = ['#ff2828', '#1c97ff','#eaeaea', '#2e2929']; // 프리셋 컬러 파레.트
let isHighlighter = false;
let isCrayon = false;
let isPen = true; 

let noiseOffset = 0;

function setup() {
  createCanvas(1600, 1000);
  //background(255);
  brushColor = color(0, 0, 0);
  brushSize = 2;
  createUI();
}

function draw() {
  for (let s of shapes) {
    drawShape(s);
  }

  BrushType(); //브러쉬 모양 설정
}

function mousePressed() {
    if (shapeMode === 'line_draw') {
      points.push([mouseX, mouseY]);
      if (points.length === 2) {
        shapes.push({ type: 'line', x1: points[0][0], y1: points[0][1], x2: points[1][0], y2: points[1][1], color: brushColor, size: brushSize }); // 정보를 넘기기 위해 shape 리스트로 push
        points = []; // 비우기
      }
  }
}

function BrushType() { // 일반 펜
  if (mouseIsPressed) {
    if (isPen) {
      stroke(brushColor);
      strokeWeight(brushSize);
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
}


function mouseDragged() {
  BrushType();
}

function drawShape(s) { // 그냥 일반 그림인지, 직선인지 곡선인지
  stroke(s.color);
  strokeWeight(s.size);
  noFill();

  if (s.type === 'line') {
    line(s.x1, s.y1, s.x2, s.y2);
  } 
  else if (s.type === 'drawIng') {
    line(s.x1, s.y1, s.x2, s.y2);
  }
}

function createUI() { // 버튼, 스크롤 제작

  for (let i = 0; i < presetColors.length/2; i++) {
    let cButton = createButton('');
    cButton.style('background-color', presetColors[i]);
    cButton.style('border-radius', '50%');
    cButton.style('width', '100px');
    cButton.style('height', '100px');
    cButton.style('border', 'none');  // ← 이거 추가!
    cButton.position(width - 100, 150 + (i+2) * 120);
    cButton.mousePressed(() => brushColor = color(presetColors[i]));
  }
  for (let i = 2; i < presetColors.length; i++) {
    let cButton = createButton('');
    cButton.style('background-color', presetColors[i]);
    cButton.style('border-radius', '50%');
    cButton.style('width', '100px');
    cButton.style('height', '100px');
    cButton.style('border', 'none');  // ← 이거 추가!
    cButton.position(100, 150 + i * 120);
    cButton.mousePressed(() => brushColor = color(presetColors[i]));
  }
}