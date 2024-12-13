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

INSERT INTO public.apps VALUES (3, 'Terminale', '&#xf0c0;', '<div id="thread_terminal" class="bg-gray-900 text-gray-300 p-4 h-full font-mono">
  <div class="output space-y-1"></div>
  <div class="flex items-center">
    <span class="text-green-500">user@system</span>
    <span class="text-blue-400">:~$</span>
    <input
      type="text"
      class="ml-2 bg-transparent outline-none flex-1" style="border: solid 0 transparent;position: relative; top: -19px; left: -3px;"
    />
  </div>
</div>', 'Application pour prendre des notes.', 'Utilitaire', 'Jane Dev', '1.0.0', '2024-11-01 12:00:00', 'user');
INSERT INTO public.apps VALUES (1, 'Nautilus', '&#xf07b;', '<body style="margin: 0; padding: 0; font-family: Ubuntu, Arial, sans-serif; display: flex; flex-direction: column; height: auto 100%; background-color: #f6f6f6;">
    <div style="background-color: #3c3b37; color: white; padding: 5px 10px;">
        <span style="font-size: 14px;">Fichiers</span>
    </div>
    <div style="display: flex; background-color: #e4e4e4; border-bottom: 1px solid #d7d7d7; padding: 5px;">
        <div style="margin-right: 10px; cursor: pointer; padding: 5px 10px; background-color: #ffffff; border-radius: 5px 5px 0 0;">
            <span style="font-size: 12px;">Documents</span>
        </div>
        <div style="margin-right: 10px; cursor: pointer; padding: 5px 10px;">
            <span style="font-size: 12px;">Téléchargements</span>
        </div>
        <div style="cursor: pointer; padding: 5px 10px;">
            <span style="font-size: 12px;">+</span>
        </div>
    </div>
    <div style="display: flex; flex-grow: 1;">
        <div style="width: 200px; background-color: #f3f3f3; border-right: 1px solid #d7d7d7; padding: 10px;">
            <div style="margin-bottom: 10px; cursor: pointer;">
                <span style="font-size: 14px;">Dossiers</span>
            </div>
            <div style="margin-bottom: 5px; cursor: pointer;">
                <span style="font-size: 12px;">Documents</span>
            </div>
            <div style="margin-bottom: 5px; cursor: pointer;">
                <span style="font-size: 12px;">Téléchargements</span>
            </div>
            <div style="margin-bottom: 5px; cursor: pointer;">
                <span style="font-size: 12px;">Images</span>
            </div>
            <div style="margin-bottom: 5px; cursor: pointer;">
                <span style="font-size: 12px;">Musique</span>
            </div>
            <div style="cursor: pointer;">
                <span style="font-size: 12px;">Vidéos</span>
            </div>
        </div>
        <div style="flex-grow: 1; padding: 10px; display: flex; flex-wrap: wrap; align-content: flex-start;">
            <div style="width: 100px; height: 100px; margin: 5px; text-align: center; cursor: pointer;">
                <div style="width: 64px; height: 64px; margin: 0 auto; background-color: #e4e4e4; border-radius: 5px;"></div>
                <span style="font-size: 12px;">Fichier 1</span>
            </div>
            <div style="width: 100px; height: 100px; margin: 5px; text-align: center; cursor: pointer;">
                <div style="width: 64px; height: 64px; margin: 0 auto; background-color: #e4e4e4; border-radius: 5px;"></div>
                <span style="font-size: 12px;">Fichier 2</span>
            </div>
            <div style="width: 100px; height: 100px; margin: 5px; text-align: center; cursor: pointer;">
                <div style="width: 64px; height: 64px; margin: 0 auto; background-color: #e4e4e4; border-radius: 5px;"></div>
                <span style="font-size: 12px;">Fichier 3</span>
            </div>
        </div>
    </div>
    <div style="position:absolute;bottom:0;width: 100%;background-color: #f3f3f3; border-top: 1px solid #d7d7d7; padding: 0px 0px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px;">3 éléments</span>
        <span style="font-size: 12px;">Espace libre : 50 Go</span>
    </div>
', 'Application permettant dexplorer les fichiers.', 'Utilitaire', 'John Dev', '1.0.0', '2024-11-01 12:00:00', 'user');
INSERT INTO public.apps VALUES (2, 'SpaceInvaders', '&#xf001;', '<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', ''Roboto'', ''Helvetica'', ''Arial'', sans-serif; background-color: #000; color: #fff; height: 100vh; display: flex; flex-direction: column; overflow: hidden;">
    <div style="background-color: #333; padding: 5px 10px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #ff5f56; margin-right: 8px;"></div>
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #ffbd2e; margin-right: 8px;"></div>
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #27c93f;"></div>
        </div>
        <span style="font-size: 14px;">Space Invaders</span>
        <div style="width: 60px;"></div>
    </div>
    <div style="flex-grow: 1; display: flex; justify-content: center; align-items: center; position: relative; background-color: #000;">
        <div style="position: absolute; top: 250px; width: 50px; height: 30px; background-color: #0f0; animation: move-cannon 4s infinite alternate;">
        </div>
                <div style="position: absolute; top: 220px; width: 5px; height: 5px; background-color: #000; animation: move-bullet 1s infinite alternate;">
                </div>
                <div style="position: absolute; top: 200px; width: 10px; height: 10px; background-color: #000; animation: move-bullet 1s infinite alternate;">
                </div>
        <div style="display: flex; justify-content: space-around; width: 100%; position: absolute; top: 50px; animation: move-invaders 2s infinite alternate;">
            <div style="width: 40px; height: 40px; background-color: #f00; clip-path: polygon(0% 20%, 20% 20%, 20% 40%, 40% 40%, 40% 60%, 20% 60%, 20% 80%, 80% 80%, 80% 60%, 60% 60%, 60% 40%, 80% 40%, 80% 20%, 100% 20%, 100% 100%, 0% 100%);"></div>
            <div style="width: 40px; height: 40px; background-color: #2f9; clip-path: polygon(0% 20%, 20% 20%, 20% 40%, 40% 40%, 40% 60%, 20% 60%, 20% 80%, 80% 80%, 80% 60%, 60% 60%, 60% 40%, 80% 40%, 80% 20%, 100% 20%, 100% 100%, 0% 100%);"></div>
            <div style="width: 40px; height: 40px; background-color: #00f; clip-path: polygon(0% 20%, 20% 20%, 20% 40%, 40% 40%, 40% 60%, 20% 60%, 20% 80%, 80% 80%, 80% 60%, 60% 60%, 60% 40%, 80% 40%, 80% 20%, 100% 20%, 100% 100%, 0% 100%);"></div>
        </div>
    </div>
    <div style="background-color: #333; padding: 10px; text-align: center; font-size: 14px;">
        Score: 0 | Vies: 3 | Niveau: 1
    </div>
    <style>
        @keyframes move-cannon {
            0% { transform: translateX(-100px); }
            100% { transform: translateX(100px); }
        }
        @keyframes move-invaders {
            0% { transform: translateX(-20px); }
            100% { transform: translateX(20px); }
        }
        @keyframes move-bullet {
            0% { transform: translateY(-70px); }
            25%{transform: translateX(0px);}
            75%{transform: translateX(5px);}
            100% { transform: translateY(30px); }
        }
    </style>


', 'Application de musique.', 'Divertissement', 'Spotify Inc.', '2.0.0', '2024-11-01 12:00:00', 'user');
INSERT INTO public.apps VALUES (19, 'DuckDuckGo', 'D', '<iframe 
    src="https://duckduckgo.com/"
    style="overflow:hidden; width:100%; height:500px; border:none;"
    title="DuckDuckGo Search">
</iframe>
', 'search', 'utile', 'developer', '1.0.0', '2024-12-08 04:08:30.668949', NULL);
INSERT INTO public.apps VALUES (20, 'Tweeter', 'X', '<blockquote class="thread_-twitter-tweet"><a href="https://twitter.com/TwitterDev/status/123456789"></a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
', 'twt', 'net', 'developer', '1.0.0', '2024-12-08 04:11:14.202884', NULL);
INSERT INTO public.apps VALUES (21, 'Map', 'M', '<iframe width="600" height="450" src="https://www.openstreetmap.org/export/embed.html?bbox=2.3522%2C48.8566%2C2.3732%2C48.8708&amp;layer=mapnik&amp;marker=48.8591%2C2.3623" style="border: 1px solid black"></iframe>
', 'map', 'utile', 'developer', '1.0.0', '2024-12-08 04:12:40.791213', NULL);
INSERT INTO public.apps VALUES (12, 'Game', 'G', '<div id="thread_-game">

  

</div>', 'C''est juste un jeu', 'Jeu', 'developer', '1.0.0', '2024-12-08 03:02:15.448609', 'user');
INSERT INTO public.apps VALUES (13, 'Hello', 'H', '<div id="thread_-hello">
Je dis hello
</div>', 'OK', 'Utile', 'developer', '1.0.0', '2024-12-08 03:08:14.019983', 'user');
INSERT INTO public.apps VALUES (14, 'Gardien', 'O', '<div id="thread_thread_tutu">
<center><h1>Bonjour</h1></center>
Voici mon bloc Note -- Personnel
</div>', 'desc', 'cat', 'developer', '1.0.0', '2024-12-08 03:14:29.134475', 'user');
INSERT INTO public.apps VALUES (15, 'Rambo', 'R', '<div id="thread_game">

  lancement...

</div>', 'jeu', 'game', 'developer', '1.0.0', '2024-12-08 03:35:01.845992', 'user');
INSERT INTO public.apps VALUES (16, 'Travel', 'T', '<h1 id="thread_koko">Mes Notes</h1>
Bonjour', 'voyage', 'Voyage', 'developer', '1.0.0', '2024-12-08 03:47:57.871899', 'user');
INSERT INTO public.apps VALUES (17, 'Titounis', 'A', '<iframe width="560" height="315" src="https://www.youtube.com/embed/d49iyKwDmjg?si=6BzYlijhKlo2zRny" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', 'Video youtube', 'Enfant', 'developer', '1.0.0', '2024-12-08 03:54:26.675644', 'user');
INSERT INTO public.apps VALUES (18, 'Zenit', 'Z', '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/d49iyKwDmjg?si=6BzYlijhKlo2zRny" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', 'Lol', 'Game', 'developer', '1.0.0', '2024-12-08 03:58:56.279303', 'user');
INSERT INTO public.apps VALUES (22, 'Robot', 'R', 'hello', 'robot', 'utile', 'developer', '1.0.0', '2024-12-08 20:45:34.518078', 'user');
INSERT INTO public.apps VALUES (23, 'Miaouss', 'M', 'Bonjour je suis miaouss
<button id="thread_lehello">Je dis hello</button>', 'Dire Hello', 'Game', 'developer', '1.0.0', '2024-12-08 21:28:22.311594', 'user');
INSERT INTO public.apps VALUES (35, 'Pratique', 'P', 'Pomme', 'pratic', 'utile', 'developer', '1.0.0', '2024-12-10 00:43:48.840129', 'user');
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
INSERT INTO public.apps VALUES (36, 'SpaceOutVaders', 'S', '<h1>SpaceInvaders</h1>
<hr>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', ''Roboto'', ''Helvetica'', ''Arial'', sans-serif; background-color: #000; color: #thread_-fff; height: 100vh; display: flex; flex-direction: column; overflow: hidden;">
    <div style="background-color: #333; padding: 5px 10px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #thread_-ff5f56; margin-right: 8px;"></div>
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #thread_-ffbd2e; margin-right: 8px;"></div>
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #27c93f;"></div>
        </div>
        <span style="font-size: 14px;">Space Invaders</span>
        <div style="width: 60px;"></div>
    </div>
    <div style="flex-grow: 1; display: flex; justify-content: center; align-items: center; position: relative; background-color: #000;">
        <div style="position: absolute; top: 250px; width: 50px; height: 30px; background-color: #0f0; animation: move-cannon 4s infinite alternate;">
        </div>
                <div style="position: absolute; top: 220px; width: 5px; height: 5px; background-color: #000; animation: move-bullet 1s infinite alternate;">
                </div>
                <div style="position: absolute; top: 200px; width: 10px; height: 10px; background-color: #000; animation: move-bullet 1s infinite alternate;">
                </div>
        <div style="display: flex; justify-content: space-around; width: 100%; position: absolute; top: 50px; animation: move-invaders 2s infinite alternate;">
            <div style="width: 40px; height: 40px; background-color: #thread_-f00; clip-path: polygon(0% 20%, 20% 20%, 20% 40%, 40% 40%, 40% 60%, 20% 60%, 20% 80%, 80% 80%, 80% 60%, 60% 60%, 60% 40%, 80% 40%, 80% 20%, 100% 20%, 100% 100%, 0% 100%);"></div>
            <div style="width: 40px; height: 40px; background-color: #2f9; clip-path: polygon(0% 20%, 20% 20%, 20% 40%, 40% 40%, 40% 60%, 20% 60%, 20% 80%, 80% 80%, 80% 60%, 60% 60%, 60% 40%, 80% 40%, 80% 20%, 100% 20%, 100% 100%, 0% 100%);"></div>
            <div style="width: 40px; height: 40px; background-color: #00f; clip-path: polygon(0% 20%, 20% 20%, 20% 40%, 40% 40%, 40% 60%, 20% 60%, 20% 80%, 80% 80%, 80% 60%, 60% 60%, 60% 40%, 80% 40%, 80% 20%, 100% 20%, 100% 100%, 0% 100%);"></div>
        </div>
    </div>
    <div style="background-color: #333; padding: 10px; text-align: center; font-size: 14px;">
        Score: 0 | Vies: 3 | Niveau: 1
    </div>
    <style>
        @keyframes move-cannon {
            0% { transform: translateX(-100px); }
            100% { transform: translateX(100px); }
        }
        @keyframes move-invaders {
            0% { transform: translateX(-20px); }
            100% { transform: translateX(20px); }
        }
        @keyframes move-bullet {
            0% { transform: translateY(-70px); }
            25%{transform: translateX(0px);}
            75%{transform: translateX(5px);}
            100% { transform: translateY(30px); }
        }
    </style>
', 'Un jeu appreciée de tout le monde', 'Game', 'developer', '1.0.0', '2024-12-10 02:13:57.224572', 'user');


--
-- Data for Name: logs; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: open_windows; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: user_installed_apps; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_installed_apps VALUES (1, 22, 1);
INSERT INTO public.user_installed_apps VALUES (3, 22, 2);
INSERT INTO public.user_installed_apps VALUES (2, 2, 3);
INSERT INTO public.user_installed_apps VALUES (4, 24, 4);
INSERT INTO public.user_installed_apps VALUES (9, 2, 12);
INSERT INTO public.user_installed_apps VALUES (10, 2, 13);
INSERT INTO public.user_installed_apps VALUES (11, 2, 14);
INSERT INTO public.user_installed_apps VALUES (12, 2, 15);
INSERT INTO public.user_installed_apps VALUES (13, 2, 16);
INSERT INTO public.user_installed_apps VALUES (14, 2, 17);
INSERT INTO public.user_installed_apps VALUES (15, 2, 18);
INSERT INTO public.user_installed_apps VALUES (16, 2, 19);
INSERT INTO public.user_installed_apps VALUES (17, 2, 20);
INSERT INTO public.user_installed_apps VALUES (18, 2, 21);
INSERT INTO public.user_installed_apps VALUES (19, 30, 22);
INSERT INTO public.user_installed_apps VALUES (20, 33, 23);
INSERT INTO public.user_installed_apps VALUES (32, 34, 35);
INSERT INTO public.user_installed_apps VALUES (33, 33, 36);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (7, 'johndoe', 'johndoe@example.com', 'hashed_password1', 'dark', 'en', '2024-11-28 20:27:11.984937', '2024-11-28 20:27:11.984937', NULL);
INSERT INTO public.users VALUES (8, 'janadoa', 'janadoa@example.com', 'hashed_password2', 'light', 'fr', '2024-11-28 20:27:11.984937', '2024-11-28 20:27:11.984937', NULL);
INSERT INTO public.users VALUES (9, 'alexsmith', 'alexsmith@example.com', 'hashed_password3', 'dark', 'en', '2024-11-28 20:27:11.984937', NULL, NULL);
INSERT INTO public.users VALUES (10, 'emilyjones', 'emilyjones@example.com', 'hashed_password4', 'light', 'es', '2024-11-28 20:27:11.984937', '2024-11-28 20:27:11.984937', NULL);
INSERT INTO public.users VALUES (11, 'michaelbrown', 'michaelbrown@example.com', 'hashed_password5', 'dark', 'de', '2024-11-28 20:27:11.984937', NULL, NULL);
INSERT INTO public.users VALUES (12, 'sarahwhite', 'sarahwhite@example.com', 'hashed_password6', 'light', 'it', '2024-11-28 20:27:11.984937', '2024-11-28 20:27:11.984937', NULL);
INSERT INTO public.users VALUES (13, 'lol', 'kjhgjgh@jgvfhjg.com', 'jjj', 'light', 'en', '2024-11-30 22:53:52.33416', '2024-11-30 22:53:52.33416', NULL);
INSERT INTO public.users VALUES (18, 'lolita', 'lalali@mail.com', 'password123', 'light', 'en', '2024-11-30 23:01:12.23059', '2024-11-30 23:01:12.23059', NULL);
INSERT INTO public.users VALUES (22, 'sohnjoe', 'joffdoe@example.com', '$2b$10$FYwFHLF.D.y4E8G31mHnAO6GfOP/aNqiHLQZpe4C0bWyfMddB2MAi', 'light', 'en', '2024-11-30 23:09:23.074859', '2024-11-30 23:09:23.074859', NULL);
INSERT INTO public.users VALUES (23, 'janidoe', 'janidoe@example.com', '$2b$10$y5Po1JSgaWWR7vcZWH0lxO1q24XshLxGJiNcdZ7JWYQebha/UNKfC', 'light', 'en', '2024-11-30 23:21:07.610201', '2024-11-30 23:21:07.610201', NULL);
INSERT INTO public.users VALUES (2, 'houssam', 'houssambacar67@gmail.com', '$2b$10$FYwFHLF.D.y4E8G31mHnAO6GfOP/aNqiHLQZpe4C0bWyfMddB2MAi', 'light', 'en', '2024-11-01 12:00:00', '2024-11-24 14:30:00', NULL);
INSERT INTO public.users VALUES (24, 'System', 'System@winmanager.local', 'nopass-isempty', 'dark', 'en', '2024-12-01 22:07:50.570312', '2024-12-01 22:07:50.570312', NULL);
INSERT INTO public.users VALUES (26, 'devopser', 'devopser@example.com', '$2b$10$wXR9qqDG6msrSW9s5Bc70OpcpBvdXuaHj/X7xe6OMbIkWMkgTNc72', 'light', 'en', '2024-12-08 20:25:19.750488', '2024-12-08 20:25:19.750488', '/home/orbite/ProjetWINManager_ENCOURs/Fonctionnelle/V4/public/USERDATA/dd0e321b79f0855d013f67b97330490d');
INSERT INTO public.users VALUES (27, 'AIDdevopser', 'AIDdevopser@example.com', '$2b$10$NS6Bou0VBmcerGGrhrWsTOF.nicXSsuCebul0Uo1AY0My/Ha1b9uK', 'light', 'en', '2024-12-08 20:26:59.85643', '2024-12-08 20:26:59.85643', '../../public/USERDATA/fd29be607c215f5246002ba87c40d22c');
INSERT INTO public.users VALUES (28, 'PPPAIDdevopser', 'PPPAIDdevopser@example.com', '$2b$10$MtTvItMdBm1rQdo2x3r4TOnzXlca5le3atvCZXKbGbHFTG0j.Qjpu', 'light', 'en', '2024-12-08 20:28:35.199969', '2024-12-08 20:28:35.199969', '3c2899448054ee88e9e6b1ba9ebe368a');
INSERT INTO public.users VALUES (30, 'lolkapiten', 'lolkapiten@example.com', '$2b$10$tWyexPepwPubt4YSkiPo1uOBO5RHwfZjMzfkckaMJgpLowHf1S2Le', 'light', 'en', '2024-12-08 20:30:31.117092', '2024-12-08 20:30:31.117092', 'b7da633bf1fe0dc4490010ddaf823a48');
INSERT INTO public.users VALUES (31, 'Marta', 'Marta@example.com', '$2b$10$7EtndC5dyNbfs3VZVEaEeeWPxdyRFIqy7HDmptWLMZe44vEtiBmXm', 'light', 'en', '2024-12-08 21:19:04.414026', '2024-12-08 21:19:04.414026', '9037d5deab42ffe7275b59234318f45a');
INSERT INTO public.users VALUES (32, 'Mirinda', 'Mirinda@example.com', '$2b$10$7i.hkzr/geVKNw56Ez4Mu.mL1qbD3DeM709Dhwzrt1Vxw4x.WeqQm', 'light', 'en', '2024-12-08 21:21:28.902499', '2024-12-08 21:21:28.902499', 'public/USERDATA/1bebe1180c063d54a54ca3a4c898ac8f');
INSERT INTO public.users VALUES (33, 'Perroquet', 'Perroquet@example.com', '$2b$10$kfF9q/pNRRosOjjTugONo.YkcdZLL7tOdxc3Osm9ttHul.W8zqKuq', 'light', 'en', '2024-12-08 21:23:42.144414', '2024-12-08 21:23:42.144414', 'dea70f9d634d473b4a39a2e8824f1901');
INSERT INTO public.users VALUES (34, 'Marie', 'Marie@example.com', '$2b$10$bLgCFEf257DY.vhzxur1M.WWR/wCHC.vuhvUr9fhB5NZ1rwVxH6bi', 'light', 'en', '2024-12-08 21:36:10.687499', '2024-12-08 21:36:10.687499', '24eeb73ca84475bb67c5650778300209');


--
-- Name: apps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.apps_id_seq', 36, true);


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

SELECT pg_catalog.setval('public.user_installed_apps_id_seq', 33, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 34, true);


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

