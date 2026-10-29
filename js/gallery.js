const images = [
  {
    preview:'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const container = document.querySelector(".gallery");

// створю функцію, в якій я буду пробігатися по масиву і створювати розмітку
function createMarkup(arr) {
  // деструктур-я объекта в парам-ре стрелочной ф-ии
  return arr.map(({preview, original, description})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${original}">
        <img
          class="gallery-image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
    `).join("");
}
// function createMarkup (arr) {
//   return arr.map(item =>`
//     <li class="gallery-item">
//       <a class="gallery-link" href="${item.original}">
//         <img
//           class="gallery-image"
//           src="${item.preview}"
//           data-source="${item.original}"
//           alt="${item.description}"
//         />
//       </a>
//     </li>
//     `).join("");
// }

// вызываем ф-ю, к-я рисует разметку И вставляем эту разметку перед закрытием тега ul
container.insertAdjacentHTML("beforeend", createMarkup(images));

// Делегування
container.addEventListener("click", handleClick);
function handleClick(event) {
  event.preventDefault(); // запретить стандартное поведение ссылки <a> при клике - браузер не будет переходить по адресу из href

  console.log(event.target); // Event Target будет всегда img, т к в моей стр-ре изображение <img> находится внутри ссылки <a> и полностью занимает её видимую обл-ть
  
  if(!event.target.classList.contains("gallery-image")) {
    return;
  }
  const source = event.target.dataset.source; // отримання посилання на велике зображення при кліку
  const alt = event.target.alt;
  
  // ініціаліз-я і відкр. модал. вікна підключеної бібліотеки
  // onShow() — ф-я, к-ю библ-ка выз-т при показе модаль.окна:
  // пока модаль.окно открыто, следит за нажатиями клавиш на док-е и вызывает onEscape. Слушатель добавлен на document, а не на изображение, т к клавишу Esc нужно ловить, даже если фокус не находится непосредственно на картинке
  // onClose() выз-ся при закрытии модаль.окна, удаляет обр-к клав-ры, чтобы он не продолжал работать, когда окно закрыто
  const instance = basicLightbox.create(`
    <div class="modal">
      <img src="${source}" alt="${alt}"/>
    </div>`,
    {
      onShow() {
        document.addEventListener('keydown',
         e => {
          if (e.code !== 'Escape') return;
          instance.close();
          }
        );
      },
      onClose() {
        document.removeEventListener('keydown',
          e => {
          if (e.code !== 'Escape') return;
          instance.close();
          });
      },
    });
  
  // Проверяем нажатую клавишу
  // Объявляется onEscape, e — объект события клавиатуры
  // const onEscape = e => {
  //   if (e.code !== 'Escape') return;
  //   instance.close();
  // };

  instance.show(); // открывает окно
};



