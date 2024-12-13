--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Ubuntu 14.15-1.pgdg22.04+1)
-- Dumped by pg_dump version 14.15 (Ubuntu 14.15-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: apps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.apps (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    icon text,
    content text,
    description text,
    category character varying(100),
    developer character varying(255),
    version character varying(20),
    created_at timestamp without time zone NOT NULL,
    type character varying
);


--
-- Name: apps_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.apps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: apps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.apps_id_seq OWNED BY public.apps.id;


--
-- Name: logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.logs (
    id integer NOT NULL,
    user_id integer,
    action character varying(50),
    app_id integer,
    "timestamp" timestamp without time zone NOT NULL,
    details jsonb
);


--
-- Name: logs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.logs_id_seq OWNED BY public.logs.id;


--
-- Name: open_windows; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.open_windows (
    id integer NOT NULL,
    user_id integer,
    app_id integer,
    title character varying(255),
    position_x integer,
    position_y integer,
    size_width integer,
    size_height integer,
    is_maximized boolean DEFAULT false,
    is_minimized boolean DEFAULT false,
    z_index integer,
    created_at timestamp without time zone NOT NULL
);


--
-- Name: open_windows_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.open_windows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: open_windows_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.open_windows_id_seq OWNED BY public.open_windows.id;


--
-- Name: user_installed_apps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_installed_apps (
    id integer NOT NULL,
    user_id integer,
    app_id integer
);


--
-- Name: user_installed_apps_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_installed_apps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_installed_apps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_installed_apps_id_seq OWNED BY public.user_installed_apps.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    theme character varying(50) DEFAULT 'light'::character varying,
    language character varying(10) DEFAULT 'en'::character varying,
    created_at timestamp without time zone NOT NULL,
    last_login timestamp without time zone,
    path text
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: apps id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.apps ALTER COLUMN id SET DEFAULT nextval('public.apps_id_seq'::regclass);


--
-- Name: logs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs ALTER COLUMN id SET DEFAULT nextval('public.logs_id_seq'::regclass);


--
-- Name: open_windows id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.open_windows ALTER COLUMN id SET DEFAULT nextval('public.open_windows_id_seq'::regclass);


--
-- Name: user_installed_apps id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_installed_apps ALTER COLUMN id SET DEFAULT nextval('public.user_installed_apps_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: apps; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.apps VALUES (4, 'ProgramManagement', '&lt;/&gt;', '<div id="thread_body">

<style>

#thread_body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
}

.thread_container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.thread_tabs {
    display: flex;
    margin-bottom: 20px;
}

.thread_tab-btn {
    padding: 10px 20px;
    border: none;
    background-color: #ddd;
    cursor: pointer;
    transition: background-color 0.3s;
}

.thread_tab-btn.active {
    background-color: #fff;
    color: #000;
}

.thread_tab-content {
    display: none;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
}

.thread_tab-content.active {
    display: block;
}

.thread_editor-container {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.thread_editor {
    flex: 1;
}

textarea {
    width: 100%;
    height: 300px;
    resize: vertical;
}

.thread_controls {
    margin-bottom: 20px;
}

button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    margin-right: 10px;
}

.thread_output {
    border: 1px solid #ddd;
    padding: 10px;
}

#thread_outputFrame {
    width: 100%;
    height: 300px;
    border: none;
}

#thread_programList {
    list-style-type: none;
    padding: 0;
}

#thread_programList li {
    padding: 10px;
    background-color: #f9f9f9;
    margin-bottom: 5px;
    cursor: pointer;
}


</style>


    <div class="thread_container" id="thread_container">
        <div class="thread_tabs">
            <button class="thread_tab-btn active" data-tab="thread_editor">Éditeur</button>
            <button class="thread_tab-btn" data-tab="thread_programs">Mes Programmes</button>
        </div>
        
        <div class="thread_tab-content active" id="thread_editor">
            <div class="thread_editor-container">
                <div class="thread_editor html-css">
                    <h3>HTML/CSS</h3>
                    <textarea id="thread_htmlCssEditor"></textarea>
                </div>
                <div class="thread_editor js">
                    <h3>JavaScript</h3>
                    <textarea id="thread_jsEditor"></textarea>
                </div>
            </div>
            <div class="thread_controls">
                <button id="thread_runBtn">Exécuter</button>
                <button id="thread_saveBtn">Sauvegarder</button>
            </div>
            <div class="thread_output">
                <h3>Résultat</h3>
                <iframe id="thread_outputFrame"></iframe>
            </div>
        </div>
        
        <div class="thread_tab-content" id="thread_programs">
            <h2>Mes Programmes</h2>
            <ul id="thread_programList"></ul>
        </div>
    </div>
    
</div>



', 'Application pour faire des programmes.', 'Utilitaire', 'System', '1.0.0', '2024-12-01 22:04:49.743105', 'system');
INSERT INTO public.apps VALUES (40, 'Administration', 'AD', '<iframe src="http://localhost:3000/_a/" title="Interface Admin" style="width: 100%; height: 700px;"></iframe>', 'Gestion de WinManager', 'Administration & Système', 'developer', '1.0.0', '2024-12-11 02:57:01.369616', 'user');


--
-- Data for Name: logs; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: open_windows; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: user_installed_apps; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_installed_apps VALUES (4, 24, 4);
INSERT INTO public.user_installed_apps VALUES (37, 24, 40);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (36, 'houssam', 'houssambacar67@gmail.com', '$2b$10$RqliIgPc8Fi4.Vt6f2CLi.TFAYfZv7gectciJI8oLprRck2N.HXly', 'light', 'en', '2024-12-11 01:48:13.972719', '2024-12-11 01:48:13.972719', '4049cf6baff977e571e74ba92ef3e0c2');
INSERT INTO public.users VALUES (24, 'System', 'System@winmanager.local', '$2b$10$RqliIgPc8Fi4.Vt6f2CLi.TFAYfZv7gectciJI8oLprRck2N.HXly', 'dark', 'en', '2024-12-01 22:07:50.570312', '2024-12-01 22:07:50.570312', 'systemdata');
INSERT INTO public.users VALUES (39, 'Reda', 'reda@example.com', '$2b$10$/PTsWmtFtf0I0CeHjynIHu2bqZxp7XDjA9raekZBxxIfkPTdSXMqG', 'light', 'en', '2024-12-12 15:39:07.249625', '2024-12-12 15:39:07.249625', 'd97ec092fece4f9c8388dbb4a6a306ee');


--
-- Name: apps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.apps_id_seq', 41, true);


--
-- Name: logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.logs_id_seq', 1, true);


--
-- Name: open_windows_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.open_windows_id_seq', 1, true);


--
-- Name: user_installed_apps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_installed_apps_id_seq', 38, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 39, true);


--
-- Name: apps apps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.apps
    ADD CONSTRAINT apps_pkey PRIMARY KEY (id);


--
-- Name: logs logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (id);


--
-- Name: open_windows open_windows_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.open_windows
    ADD CONSTRAINT open_windows_pkey PRIMARY KEY (id);


--
-- Name: user_installed_apps user_installed_apps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_installed_apps
    ADD CONSTRAINT user_installed_apps_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: logs logs_app_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_app_id_fkey FOREIGN KEY (app_id) REFERENCES public.apps(id);


--
-- Name: logs logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: open_windows open_windows_app_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.open_windows
    ADD CONSTRAINT open_windows_app_id_fkey FOREIGN KEY (app_id) REFERENCES public.apps(id) ON DELETE CASCADE;


--
-- Name: open_windows open_windows_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.open_windows
    ADD CONSTRAINT open_windows_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_installed_apps user_installed_apps_app_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_installed_apps
    ADD CONSTRAINT user_installed_apps_app_id_fkey FOREIGN KEY (app_id) REFERENCES public.apps(id) ON DELETE CASCADE;


--
-- Name: user_installed_apps user_installed_apps_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_installed_apps
    ADD CONSTRAINT user_installed_apps_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

