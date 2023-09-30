/**
 * Representa o deslocamento do mouse ou toque.
 */
type DragOffset = {
  x: number;
  y: number;
};

/**
 * Representa o deslocamento para redimensionamento.
 */
type ResizeOffset = {
  x: number;
  y: number;
};

/**
 * Largura mínima do seletor de colunas.
 */
const MIN_WIDTH = 250;

/**
 * Altura mínima do seletor de colunas.
 */
const MIN_HEIGHT = 260;

/**
 * Armazena a borda atualmente em foco.
 */
let border: string | null = null;

/**
 * Armazena o deslocamento do mouse ou toque para arrastar.
 */
let dragOffset: DragOffset = { x: 0, y: 0 };

/**
 * Armazena o deslocamento para redimensionamento.
 */
let resizeOffset: ResizeOffset = { x: 0, y: 0 };

/**
 * Armazena o seletor de colunas.
 */
let columnsSelector: HTMLElement | null;

/**
 * Inicia a funcionalidade de redimensionamento de coluna.
 * @param selectorId - O ID do seletor de colunas.
 * @param bordersClass - A classe das bordas do seletor de colunas.
 */
export function resizableColumnSelector(
  selectorId: string,
  bordersClass: string
) {
  columnsSelector = document.getElementById(selectorId);
  if (!columnsSelector) return;

  const resizableEdges = columnsSelector.querySelectorAll(`.${bordersClass}`);
  resizableEdges.forEach((edge) => {
    edge.addEventListener("mousedown", (e) =>
      handleMouseDownOrTouchStart(e as MouseEvent)
    );
    edge.addEventListener("touchstart", (e) =>
      handleMouseDownOrTouchStart(e as TouchEvent)
    );
  });

  document.addEventListener("mouseup", handleMouseUpOrTouchEnd);
  document.addEventListener("touchend", handleMouseUpOrTouchEnd);
  document.addEventListener("mousemove", handleMouseMoveOrTouchMove);
  document.addEventListener("touchmove", handleMouseMoveOrTouchMove);
}

/**
 * Restaura a largura e altura padrão do seletor de colunas.
 * @param id - O ID do seletor de colunas.
 */
export function restoreWidthColumnSelector(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.style.width = `${MIN_WIDTH}px`;
    el.style.height = `${MIN_HEIGHT}px`;
  }
}

/**
 * Manipulador do evento "mousedown" ou "touchstart" para iniciar o redimensionamento da coluna.
 * @param e - O evento do mouse ou toque.
 */
function handleMouseDownOrTouchStart(e: MouseEvent | TouchEvent) {
  const elem = e.target as HTMLElement;
  border = elem?.classList[elem.classList.length - 1];
  if (!border) return;

  const { pageX, pageY } = e instanceof MouseEvent ? e : e.touches[0];

  if (!columnsSelector) return;

  switch (border) {
    case "top":
      dragOffset.y = pageY - columnsSelector.offsetTop;
      resizeOffset.y = pageY + columnsSelector.offsetHeight;
      break;
    case "bottom":
      resizeOffset.y = pageY - columnsSelector.offsetHeight;
      break;
    case "left":
      dragOffset.x = pageX - columnsSelector.offsetLeft;
      resizeOffset.x = pageX + columnsSelector.offsetWidth;
      break;
    case "right":
      resizeOffset.x = pageX - columnsSelector.offsetWidth;
      break;
    case "top-left":
      dragOffset.x = pageX - columnsSelector.offsetLeft;
      dragOffset.y = pageY - columnsSelector.offsetTop;
      resizeOffset.x = pageX + columnsSelector.offsetWidth;
      resizeOffset.y = pageY + columnsSelector.offsetHeight;
      break;
    case "top-right":
      dragOffset.y = pageY - columnsSelector.offsetTop;
      resizeOffset.y = pageY + columnsSelector.offsetHeight;
      resizeOffset.x = pageX - columnsSelector.offsetWidth;
      break;
    case "bottom-left":
      resizeOffset.y = pageY - columnsSelector.offsetHeight;
      dragOffset.x = pageX - columnsSelector.offsetLeft;
      resizeOffset.x = pageX + columnsSelector.offsetWidth;
      break;
    case "bottom-right":
      resizeOffset.y = pageY - columnsSelector.offsetHeight;
      resizeOffset.x = pageX - columnsSelector.offsetWidth;
      break;
  }
}

/**
 * Manipulador do evento "mousemove" ou "touchmove" para redimensionar a coluna.
 * @param e - O evento do mouse ou toque.
 */
function handleMouseMoveOrTouchMove(e: MouseEvent | TouchEvent) {
  if (!border) return;

  const { pageX, pageY } = e instanceof MouseEvent ? e : e.touches[0];

  if (!columnsSelector) return;

  switch (border) {
    case "top":
      const offsetY = pageY - dragOffset.y;
      const resizeY = resizeOffset.y - pageY;
      if (resizeY > 0) {
        columnsSelector.style.top = offsetY + "px";
        columnsSelector.style.height = resizeY + "px";
      }
      break;
    case "bottom":
      const resizeYBottom = pageY - resizeOffset.y;
      if (resizeYBottom > 0) {
        columnsSelector.style.height = resizeYBottom + "px";
      }
      break;
    case "left":
      const offsetX = pageX - dragOffset.x;
      const resizeX = resizeOffset.x - pageX;
      if (resizeX > 0) {
        columnsSelector.style.left = offsetX + "px";
        columnsSelector.style.width = resizeX + "px";
      }
      break;
    case "right":
      const resizeXRight = pageX - resizeOffset.x;
      if (resizeXRight > 0) {
        columnsSelector.style.width = resizeXRight + "px";
      }
      break;
    case "top-left":
      const offsetYTopLeft = pageY - dragOffset.y;
      const resizeYTopLeft = resizeOffset.y - pageY;
      const offsetXTopLeft = pageX - dragOffset.x;
      const resizeXTopLeft = resizeOffset.x - pageX;
      if (resizeYTopLeft > 0) {
        columnsSelector.style.top = offsetYTopLeft + "px";
        columnsSelector.style.height = resizeYTopLeft + "px";
      }
      if (resizeXTopLeft > 0) {
        columnsSelector.style.left = offsetXTopLeft + "px";
        columnsSelector.style.width = resizeXTopLeft + "px";
      }
      break;
    case "top-right":
      const offsetYTopRight = pageY - dragOffset.y;
      const resizeYTopRight = resizeOffset.y - pageY;
      const resizeXTopRight = pageX - columnsSelector.offsetWidth;
      if (resizeYTopRight > 0) {
        columnsSelector.style.top = offsetYTopRight + "px";
        columnsSelector.style.height = resizeYTopRight + "px";
      }
      if (resizeXTopRight > 0) {
        columnsSelector.style.width = resizeXTopRight + "px";
      }
      break;
    case "bottom-left":
      const resizeYBottomLeft = pageY - resizeOffset.y;
      const offsetXBottomLeft = pageX - dragOffset.x;
      const resizeXBottomLeft = resizeOffset.x - pageX;
      if (resizeYBottomLeft > 0) {
        columnsSelector.style.height = resizeYBottomLeft + "px";
      }
      if (resizeXBottomLeft > 0) {
        columnsSelector.style.left = offsetXBottomLeft + "px";
        columnsSelector.style.width = resizeXBottomLeft + "px";
      }
      break;
    case "bottom-right":
      const resizeYBottomRight = pageY - resizeOffset.y;
      const resizeXBottomRight = pageX - resizeOffset.x;
      if (resizeYBottomRight > 0) {
        columnsSelector.style.height = resizeYBottomRight + "px";
      }
      if (resizeXBottomRight > 0) {
        columnsSelector.style.width = resizeXBottomRight + "px";
      }
      break;
  }
}

/**
 * Manipulador do evento "mouseup" ou "touchend" para encerrar o redimensionamento da coluna.
 */
function handleMouseUpOrTouchEnd() {
  border = null;
}
