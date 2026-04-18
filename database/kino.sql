--
-- PostgreSQL database dump
--

\restrict yGEHyeogLQvpVN4oBce8TOgivneD9kii4BiiARt06jKOZHREYdVFBjRK24pFM0D

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Cashier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cashier" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    patronymic character varying(255) NOT NULL
);


ALTER TABLE public."Cashier" OWNER TO postgres;

--
-- Name: Cashier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cashier_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Cashier_id_seq" OWNER TO postgres;

--
-- Name: Cashier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cashier_id_seq" OWNED BY public."Cashier".id;


--
-- Name: Film; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Film" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "ageRestriction" character varying(255) NOT NULL,
    duration character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    poster text
);


ALTER TABLE public."Film" OWNER TO postgres;

--
-- Name: Film_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Film_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Film_id_seq" OWNER TO postgres;

--
-- Name: Film_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Film_id_seq" OWNED BY public."Film".id;


--
-- Name: Genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Genres" (
    id integer CONSTRAINT genres_id_not_null NOT NULL,
    name text
);


ALTER TABLE public."Genres" OWNER TO postgres;

--
-- Name: GenresFilm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GenresFilm" (
    id integer NOT NULL,
    genre_id bigint NOT NULL,
    film_id bigint NOT NULL
);


ALTER TABLE public."GenresFilm" OWNER TO postgres;

--
-- Name: GenresFilm_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."GenresFilm_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."GenresFilm_id_seq" OWNER TO postgres;

--
-- Name: GenresFilm_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."GenresFilm_id_seq" OWNED BY public."GenresFilm".id;


--
-- Name: Hall; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Hall" (
    id integer NOT NULL,
    number bigint NOT NULL
);


ALTER TABLE public."Hall" OWNER TO postgres;

--
-- Name: Hall_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Hall_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Hall_id_seq" OWNER TO postgres;

--
-- Name: Hall_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Hall_id_seq" OWNED BY public."Hall".id;


--
-- Name: Reservation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reservation" (
    id integer NOT NULL,
    "timeCreate" time without time zone NOT NULL,
    seat_id bigint NOT NULL,
    cashier_id bigint NOT NULL,
    status_id bigint NOT NULL,
    showing_id bigint NOT NULL,
    price numeric(10,0) NOT NULL
);


ALTER TABLE public."Reservation" OWNER TO postgres;

--
-- Name: Reservation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Reservation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reservation_id_seq" OWNER TO postgres;

--
-- Name: Reservation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Reservation_id_seq" OWNED BY public."Reservation".id;


--
-- Name: Row; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Row" (
    id integer NOT NULL,
    hall_id bigint NOT NULL,
    number bigint NOT NULL
);


ALTER TABLE public."Row" OWNER TO postgres;

--
-- Name: Row_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Row_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Row_id_seq" OWNER TO postgres;

--
-- Name: Row_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Row_id_seq" OWNED BY public."Row".id;


--
-- Name: Seat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Seat" (
    id integer NOT NULL,
    type_seat_id bigint NOT NULL,
    row_id bigint NOT NULL,
    number bigint NOT NULL
);


ALTER TABLE public."Seat" OWNER TO postgres;

--
-- Name: Seat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Seat_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Seat_id_seq" OWNER TO postgres;

--
-- Name: Seat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Seat_id_seq" OWNED BY public."Seat".id;


--
-- Name: Showing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Showing" (
    id integer NOT NULL,
    "timeStart" time without time zone NOT NULL,
    date date NOT NULL,
    hall_id bigint NOT NULL,
    film_id bigint NOT NULL
);


ALTER TABLE public."Showing" OWNER TO postgres;

--
-- Name: Showing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Showing_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Showing_id_seq" OWNER TO postgres;

--
-- Name: Showing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Showing_id_seq" OWNED BY public."Showing".id;


--
-- Name: Status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Status" (
    id integer NOT NULL,
    "statusName" character varying(255) NOT NULL
);


ALTER TABLE public."Status" OWNER TO postgres;

--
-- Name: Status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Status_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Status_id_seq" OWNER TO postgres;

--
-- Name: Status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Status_id_seq" OWNED BY public."Status".id;


--
-- Name: TypeSeat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TypeSeat" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price_factor double precision NOT NULL
);


ALTER TABLE public."TypeSeat" OWNER TO postgres;

--
-- Name: TypeSeat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TypeSeat_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TypeSeat_id_seq" OWNER TO postgres;

--
-- Name: TypeSeat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TypeSeat_id_seq" OWNED BY public."TypeSeat".id;


--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.genres_id_seq OWNER TO postgres;

--
-- Name: genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genres_id_seq OWNED BY public."Genres".id;


--
-- Name: Cashier id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cashier" ALTER COLUMN id SET DEFAULT nextval('public."Cashier_id_seq"'::regclass);


--
-- Name: Film id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Film" ALTER COLUMN id SET DEFAULT nextval('public."Film_id_seq"'::regclass);


--
-- Name: Genres id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Genres" ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);


--
-- Name: GenresFilm id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GenresFilm" ALTER COLUMN id SET DEFAULT nextval('public."GenresFilm_id_seq"'::regclass);


--
-- Name: Hall id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hall" ALTER COLUMN id SET DEFAULT nextval('public."Hall_id_seq"'::regclass);


--
-- Name: Reservation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation" ALTER COLUMN id SET DEFAULT nextval('public."Reservation_id_seq"'::regclass);


--
-- Name: Row id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Row" ALTER COLUMN id SET DEFAULT nextval('public."Row_id_seq"'::regclass);


--
-- Name: Seat id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seat" ALTER COLUMN id SET DEFAULT nextval('public."Seat_id_seq"'::regclass);


--
-- Name: Showing id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Showing" ALTER COLUMN id SET DEFAULT nextval('public."Showing_id_seq"'::regclass);


--
-- Name: Status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Status" ALTER COLUMN id SET DEFAULT nextval('public."Status_id_seq"'::regclass);


--
-- Name: TypeSeat id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TypeSeat" ALTER COLUMN id SET DEFAULT nextval('public."TypeSeat_id_seq"'::regclass);


--
-- Data for Name: Cashier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cashier" (id, name, surname, patronymic) FROM stdin;
\.


--
-- Data for Name: Film; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Film" (id, name, "ageRestriction", duration, description, poster) FROM stdin;
1	Форсаж	18+	106	Коп под прикрытием внедряется в банду стритрейсеров и становится одним из них. Первая часть гоночной франшизы	https://upload.wikimedia.org/wikipedia/ru/thumb/3/3b/The_Fast_and_the_Furious.jpg/250px-The_Fast_and_the_Furious.jpg
\.


--
-- Data for Name: Genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Genres" (id, name) FROM stdin;
\.


--
-- Data for Name: GenresFilm; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."GenresFilm" (id, genre_id, film_id) FROM stdin;
\.


--
-- Data for Name: Hall; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Hall" (id, number) FROM stdin;
1	1
\.


--
-- Data for Name: Reservation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reservation" (id, "timeCreate", seat_id, cashier_id, status_id, showing_id, price) FROM stdin;
\.


--
-- Data for Name: Row; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Row" (id, hall_id, number) FROM stdin;
\.


--
-- Data for Name: Seat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Seat" (id, type_seat_id, row_id, number) FROM stdin;
\.


--
-- Data for Name: Showing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Showing" (id, "timeStart", date, hall_id, film_id) FROM stdin;
\.


--
-- Data for Name: Status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Status" (id, "statusName") FROM stdin;
\.


--
-- Data for Name: TypeSeat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TypeSeat" (id, name, price_factor) FROM stdin;
\.


--
-- Name: Cashier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cashier_id_seq"', 1, false);


--
-- Name: Film_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Film_id_seq"', 1, true);


--
-- Name: GenresFilm_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."GenresFilm_id_seq"', 1, false);


--
-- Name: Hall_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Hall_id_seq"', 1, true);


--
-- Name: Reservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Reservation_id_seq"', 1, false);


--
-- Name: Row_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Row_id_seq"', 1, false);


--
-- Name: Seat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Seat_id_seq"', 1, false);


--
-- Name: Showing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Showing_id_seq"', 1, false);


--
-- Name: Status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Status_id_seq"', 1, false);


--
-- Name: TypeSeat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TypeSeat_id_seq"', 1, false);


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genres_id_seq', 1, false);


--
-- Name: Cashier Cashier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cashier"
    ADD CONSTRAINT "Cashier_pkey" PRIMARY KEY (id);


--
-- Name: Film Film_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Film"
    ADD CONSTRAINT "Film_pkey" PRIMARY KEY (id);


--
-- Name: GenresFilm GenresFilm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GenresFilm"
    ADD CONSTRAINT "GenresFilm_pkey" PRIMARY KEY (id);


--
-- Name: Hall Hall_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hall"
    ADD CONSTRAINT "Hall_pkey" PRIMARY KEY (id);


--
-- Name: Reservation Reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY (id);


--
-- Name: Row Row_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Row"
    ADD CONSTRAINT "Row_pkey" PRIMARY KEY (id);


--
-- Name: Seat Seat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seat"
    ADD CONSTRAINT "Seat_pkey" PRIMARY KEY (id);


--
-- Name: Showing Showing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Showing"
    ADD CONSTRAINT "Showing_pkey" PRIMARY KEY (id);


--
-- Name: Status Status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Status"
    ADD CONSTRAINT "Status_pkey" PRIMARY KEY (id);


--
-- Name: TypeSeat TypeSeat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TypeSeat"
    ADD CONSTRAINT "TypeSeat_pkey" PRIMARY KEY (id);


--
-- Name: Genres genres_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Genres"
    ADD CONSTRAINT genres_pk PRIMARY KEY (id);


--
-- Name: GenresFilm GenresFilm_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GenresFilm"
    ADD CONSTRAINT "GenresFilm_fk2" FOREIGN KEY (film_id) REFERENCES public."Film"(id);


--
-- Name: Reservation Reservation_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_fk2" FOREIGN KEY (seat_id) REFERENCES public."Seat"(id);


--
-- Name: Reservation Reservation_fk3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_fk3" FOREIGN KEY (cashier_id) REFERENCES public."Cashier"(id);


--
-- Name: Reservation Reservation_fk4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_fk4" FOREIGN KEY (status_id) REFERENCES public."Status"(id);


--
-- Name: Reservation Reservation_fk5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_fk5" FOREIGN KEY (showing_id) REFERENCES public."Showing"(id);


--
-- Name: Row Row_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Row"
    ADD CONSTRAINT "Row_fk1" FOREIGN KEY (hall_id) REFERENCES public."Hall"(id);


--
-- Name: Seat Seat_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seat"
    ADD CONSTRAINT "Seat_fk1" FOREIGN KEY (type_seat_id) REFERENCES public."TypeSeat"(id);


--
-- Name: Seat Seat_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seat"
    ADD CONSTRAINT "Seat_fk2" FOREIGN KEY (row_id) REFERENCES public."Row"(id);


--
-- Name: Showing Showing_fk3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Showing"
    ADD CONSTRAINT "Showing_fk3" FOREIGN KEY (hall_id) REFERENCES public."Hall"(id);


--
-- Name: Showing Showing_fk4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Showing"
    ADD CONSTRAINT "Showing_fk4" FOREIGN KEY (film_id) REFERENCES public."Film"(id);


--
-- Name: GenresFilm genresfilm_genres_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GenresFilm"
    ADD CONSTRAINT genresfilm_genres_fk FOREIGN KEY (genre_id) REFERENCES public."Genres"(id);


--
-- PostgreSQL database dump complete
--

\unrestrict yGEHyeogLQvpVN4oBce8TOgivneD9kii4BiiARt06jKOZHREYdVFBjRK24pFM0D

