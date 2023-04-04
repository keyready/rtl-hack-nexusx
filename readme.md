<style>
    .link-btn:link,
    .link-btn:visited {
        text-decoration: none;
        border-radius: 4px;
        outline: 2px solid blue;
        color: lightblue;
        text-align: left;
        padding: 2px 5px;
        margin-right: 7px;
    }

    .badge {
        opacity: 0.4;
        color: greenyellow;
    }

    .badge.Backend {
        opacity: 0.6;
        color: blue;
    }

    .badge.frontend {
        opacity: 0.6;
        color: red;
    }
</style>

<h1 align="center">
Решение трека №1 от команды NexusX Team | RTL.Hack
</h1>

<p align="center">
    <img src="readme-source/logo.jpg" width="800" height="400">
</p>

### Участники команды

<ul>
    <li>
        <a href="https://t.me/G_Rosman" class="link-btn">
            Яроцкий Глеб
        </a>
        <span class="badge Backend">(Backend-разработка)</span>
    </li>
    <li>
        <a href="https://t.me/operculum" class="link-btn">
            Поляков Дмитрий
        </a>
        <span class="badge">(UI/UX, спикер)</span>
    </li>
    <li>
        <a href="https://t.me/VALI666KO" class="link-btn">
            Кофанов Валентин
        </a>
        <span class="badge Backend">(Backend-разработка)</span>
    </li>
    <li>
        <a href="https://t.me/kasperrr123" class="link-btn">
            Низамидинов Малик
        </a>
        <span class="badge Backend">(Backend-разработка)</span>
    </li>
    <li>
        <a href="https://t.me/keyrea_dy" class="link-btn">
            Корчак Родион
        </a>
        <span class="badge frontend">(Frontend-разработка, капитан команды)</span>
    </li>
</ul>

### Скрипты приложения:

`npm start` - запуск frontend-части приложение на devServer  
`npm run start:dev` - запуск frontend-части и json-server для dev-разработки  
`npm run build:dev` - сборка приложение (development-версия)  
`npm run build:prod` - сборка приложение (production-версия)  
`npm run lint:ts` - запустить линтер для ts-файлов  
`npm run lint:ts:fix` - запустить линтер для ts-файлов и пофиксить все, что возможно  
`npm run lint:scss` - запустить линтер для scss-файлов  
`npm run lint:scss:fix` - запустить линтер для scss-файлов и пофиксить все, что возможно  
