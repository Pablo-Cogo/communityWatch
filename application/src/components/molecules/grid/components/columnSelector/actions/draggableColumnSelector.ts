type DragOffset = {
  x: number;
  y: number;
};

let dragState: {
  isDragReady: boolean;
  offset: DragOffset;
  element: HTMLElement | null;
} = {
  isDragReady: false,
  offset: { x: 0, y: 0 },
  element: null,
};

/**
 * Inicia a funcionalidade de arrastar um elemento.
 * @param id - O ID do elemento a ser arrastado.
 * @param handleSelector - Seletor do elemento que atuará como alça para arrastar (opcional).
 */
export function draggable(id: string, handleSelector?: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const handle = handleSelector
    ? element.querySelector(handleSelector)
    : element;

  if (!handle) return;

  handle.addEventListener("mousedown", (e) =>
    startDrag(e as MouseEvent, element)
  );
  handle.addEventListener("touchstart", (e) =>
    startDrag(e as TouchEvent, element)
  );

  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);

  document.addEventListener("mousemove", (e) => {
    if (dragState.isDragReady && dragState.element) {
      handleDrag(e, dragState.element);
    }
  });

  document.addEventListener("touchmove", (e) => {
    if (dragState.isDragReady && dragState.element) {
      handleDrag(e.touches[0], dragState.element);
    }
  });

  window.addEventListener("resize", () => {
    if (
      dragState.element &&
      dragState.element.offsetLeft + dragState.element.offsetWidth >=
        window.innerWidth
    ) {
      dragState.element.style.right = "0px";
      dragState.element.style.left = "auto";
    }
  });
}

/**
 * Inicia o arrastar.
 * @param e - O evento de mouse ou toque.
 * @param element - O elemento a ser arrastado.
 */
function startDrag(e: MouseEvent | TouchEvent, element: HTMLElement) {
  dragState.isDragReady = true;
  const { pageX, pageY } = e instanceof MouseEvent ? e : e.touches[0];
  dragState.offset.x = pageX - element.offsetLeft;
  dragState.offset.y = pageY - element.offsetTop;
  dragState.element = element;
}

/**
 * Manipula o arrastar.
 * @param e - O evento de mouse ou toque.
 * @param element - O elemento a ser arrastado.
 */
function handleDrag(e: MouseEvent | Touch, element: HTMLElement) {
  const { pageX, pageY } = e;
  const offsetX = pageX - dragState.offset.x;
  const offsetY = pageY - dragState.offset.y;

  element.style.right = "auto";
  element.style.left = `${offsetX}px`;
  element.style.top = `${offsetY}px`;
}

/**
 * Encerra o arrastar.
 */
function endDrag() {
  dragState.isDragReady = false;
  dragState.element = null;
}

/**
 * Restaura a posição padrão de um elemento arrastável.
 * @param id - O ID do elemento a ser restaurado.
 */
export function restoreDraggable(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  element.style.right = "0px";
  element.style.left = "auto";
  element.style.top = "0px";
}
