import { LoanPage } from "./LoanPage";
import { Loan } from "./Loan";
import { ClientMock } from "src/app/client/model/client.mock";
import { GameMock } from "src/app/game/model/game-mock";
import { Client } from "src/app/client/model/Client";
import { Game } from "src/app/game/model/Game";

const CLIENT_DATA: ClientMock[] = [
    { id: 1, name: 'Isabella' },
    { id: 2, name: 'Luci' },
    { id: 3, name: 'Gustavo' },
    { id: 4, name: 'Carla' },
    { id: 5, name: 'Eve' },
    { id: 6, name: 'Lola' },
    { id: 7, name: 'Manuela' },
];

const GAME_DATA: GameMock[] = [
    { id: 1, title: 'On Mars' },
    { id: 2, title: 'Aventureros al tren' },
    { id: 3, title: '1920: Wall Street' },
    { id: 4, title: 'Barrage' },
    { id: 5, title: 'Los viajes de Marco Polo' },
    { id: 6, title: 'Azul' },
];

const LOAN_DATA_CONTENT: Loan[] = [
    { id: 1, client: CLIENT_DATA[0] as Client, game: GAME_DATA[0] as Game, startLoanDate: new Date('2024-07-15'), endLoanDate: new Date('2024-07-19') },
    { id: 2, client: CLIENT_DATA[1] as Client, game: GAME_DATA[1] as Game, startLoanDate: new Date('2024-07-20'), endLoanDate: new Date('2024-07-24') },
    { id: 3, client: CLIENT_DATA[2] as Client, game: GAME_DATA[2] as Game, startLoanDate: new Date('2024-07-15'), endLoanDate: new Date('2024-07-17') },
    { id: 4, client: CLIENT_DATA[3] as Client, game: GAME_DATA[3] as Game, startLoanDate: new Date('2024-07-18'), endLoanDate: new Date('2024-07-21') },
    { id: 5, client: CLIENT_DATA[4] as Client, game: GAME_DATA[4] as Game, startLoanDate: new Date('2024-07-21'), endLoanDate: new Date('2024-07-24') },
    { id: 6, client: CLIENT_DATA[5] as Client, game: GAME_DATA[5] as Game, startLoanDate: new Date('2024-07-15'), endLoanDate: new Date('2024-07-18') },
    { id: 7, client: CLIENT_DATA[6] as Client, game: GAME_DATA[1] as Game, startLoanDate: new Date('2024-07-19'), endLoanDate: new Date('2024-07-22') },
];

export const LOAN_DATA: LoanPage = {
    content: LOAN_DATA_CONTENT,
    pageable: {
        pageSize: 5,
        pageNumber: 0,
        sort: [
            { property: "id", direction: "ASC" }
        ]
    },
    totalElements: 7
};
