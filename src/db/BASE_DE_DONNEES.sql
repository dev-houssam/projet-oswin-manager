PGDMP      &                |         
   winmanager %   14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)     17.2 (Ubuntu 17.2-1.pgdg22.04+1) 3    W           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            X           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            Y           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            Z           1262    16384 
   winmanager    DATABASE     v   CREATE DATABASE winmanager WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'fr_FR.UTF-8';
    DROP DATABASE winmanager;
                     houssam    false            [           0    0    DATABASE winmanager    ACL     o   REVOKE ALL ON DATABASE winmanager FROM houssam;
GRANT ALL ON DATABASE winmanager TO houssam WITH GRANT OPTION;
                        houssam    false    3418                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     postgres    false            \           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        postgres    false    4            ]           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                        postgres    false    4            �            1259    16468    apps    TABLE     :  CREATE TABLE public.apps (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    icon text,
    content text,
    description text,
    category character varying(100),
    developer character varying(255),
    version character varying(20),
    created_at timestamp without time zone NOT NULL
);
    DROP TABLE public.apps;
       public         heap r       postgres    false    4            �            1259    16467    apps_id_seq    SEQUENCE     �   CREATE SEQUENCE public.apps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.apps_id_seq;
       public               postgres    false    4    212            ^           0    0    apps_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.apps_id_seq OWNED BY public.apps.id;
          public               postgres    false    211            �            1259    16513    logs    TABLE     �   CREATE TABLE public.logs (
    id integer NOT NULL,
    user_id integer,
    action character varying(50),
    app_id integer,
    "timestamp" timestamp without time zone NOT NULL,
    details jsonb
);
    DROP TABLE public.logs;
       public         heap r       postgres    false    4            �            1259    16512    logs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.logs_id_seq;
       public               postgres    false    218    4            _           0    0    logs_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.logs_id_seq OWNED BY public.logs.id;
          public               postgres    false    217            �            1259    16494    open_windows    TABLE     �  CREATE TABLE public.open_windows (
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
     DROP TABLE public.open_windows;
       public         heap r       postgres    false    4            �            1259    16493    open_windows_id_seq    SEQUENCE     �   CREATE SEQUENCE public.open_windows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.open_windows_id_seq;
       public               postgres    false    4    216            `           0    0    open_windows_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.open_windows_id_seq OWNED BY public.open_windows.id;
          public               postgres    false    215            �            1259    16477    user_installed_apps    TABLE     n   CREATE TABLE public.user_installed_apps (
    id integer NOT NULL,
    user_id integer,
    app_id integer
);
 '   DROP TABLE public.user_installed_apps;
       public         heap r       postgres    false    4            �            1259    16476    user_installed_apps_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_installed_apps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.user_installed_apps_id_seq;
       public               postgres    false    4    214            a           0    0    user_installed_apps_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.user_installed_apps_id_seq OWNED BY public.user_installed_apps.id;
          public               postgres    false    213            �            1259    16389    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    theme character varying(50) DEFAULT 'light'::character varying,
    language character varying(10) DEFAULT 'en'::character varying,
    created_at timestamp without time zone NOT NULL,
    last_login timestamp without time zone
);
    DROP TABLE public.users;
       public         heap r       houssam    false    4            �            1259    16388    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               houssam    false    4    210            b           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               houssam    false    209            �           2604    16471    apps id    DEFAULT     b   ALTER TABLE ONLY public.apps ALTER COLUMN id SET DEFAULT nextval('public.apps_id_seq'::regclass);
 6   ALTER TABLE public.apps ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    211    212    212            �           2604    16516    logs id    DEFAULT     b   ALTER TABLE ONLY public.logs ALTER COLUMN id SET DEFAULT nextval('public.logs_id_seq'::regclass);
 6   ALTER TABLE public.logs ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            �           2604    16497    open_windows id    DEFAULT     r   ALTER TABLE ONLY public.open_windows ALTER COLUMN id SET DEFAULT nextval('public.open_windows_id_seq'::regclass);
 >   ALTER TABLE public.open_windows ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    216    215    216            �           2604    16480    user_installed_apps id    DEFAULT     �   ALTER TABLE ONLY public.user_installed_apps ALTER COLUMN id SET DEFAULT nextval('public.user_installed_apps_id_seq'::regclass);
 E   ALTER TABLE public.user_installed_apps ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    214    213    214            �           2604    16392    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               houssam    false    210    209    210            N          0    16468    apps 
   TABLE DATA           n   COPY public.apps (id, name, icon, content, description, category, developer, version, created_at) FROM stdin;
    public               postgres    false    212   �<       T          0    16513    logs 
   TABLE DATA           Q   COPY public.logs (id, user_id, action, app_id, "timestamp", details) FROM stdin;
    public               postgres    false    218   �B       R          0    16494    open_windows 
   TABLE DATA           �   COPY public.open_windows (id, user_id, app_id, title, position_x, position_y, size_width, size_height, is_maximized, is_minimized, z_index, created_at) FROM stdin;
    public               postgres    false    216   �B       P          0    16477    user_installed_apps 
   TABLE DATA           B   COPY public.user_installed_apps (id, user_id, app_id) FROM stdin;
    public               postgres    false    214   C       L          0    16389    users 
   TABLE DATA           l   COPY public.users (id, username, email, password_hash, theme, language, created_at, last_login) FROM stdin;
    public               houssam    false    210   3C       c           0    0    apps_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.apps_id_seq', 3, true);
          public               postgres    false    211            d           0    0    logs_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.logs_id_seq', 1, true);
          public               postgres    false    217            e           0    0    open_windows_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.open_windows_id_seq', 1, true);
          public               postgres    false    215            f           0    0    user_installed_apps_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.user_installed_apps_id_seq', 4, true);
          public               postgres    false    213            g           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 23, true);
          public               houssam    false    209            �           2606    16475    apps apps_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.apps
    ADD CONSTRAINT apps_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.apps DROP CONSTRAINT apps_pkey;
       public                 postgres    false    212            �           2606    16520    logs logs_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.logs DROP CONSTRAINT logs_pkey;
       public                 postgres    false    218            �           2606    16501    open_windows open_windows_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.open_windows
    ADD CONSTRAINT open_windows_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.open_windows DROP CONSTRAINT open_windows_pkey;
       public                 postgres    false    216            �           2606    16482 ,   user_installed_apps user_installed_apps_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.user_installed_apps
    ADD CONSTRAINT user_installed_apps_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.user_installed_apps DROP CONSTRAINT user_installed_apps_pkey;
       public                 postgres    false    214            �           2606    16402    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 houssam    false    210            �           2606    16398    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 houssam    false    210            �           2606    16400    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public                 houssam    false    210            �           2606    16526    logs logs_app_id_fkey    FK CONSTRAINT     r   ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_app_id_fkey FOREIGN KEY (app_id) REFERENCES public.apps(id);
 ?   ALTER TABLE ONLY public.logs DROP CONSTRAINT logs_app_id_fkey;
       public               postgres    false    3251    212    218            �           2606    16521    logs logs_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.logs DROP CONSTRAINT logs_user_id_fkey;
       public               postgres    false    210    3247    218            �           2606    16507 %   open_windows open_windows_app_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.open_windows
    ADD CONSTRAINT open_windows_app_id_fkey FOREIGN KEY (app_id) REFERENCES public.apps(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.open_windows DROP CONSTRAINT open_windows_app_id_fkey;
       public               postgres    false    3251    216    212            �           2606    16502 &   open_windows open_windows_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.open_windows
    ADD CONSTRAINT open_windows_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.open_windows DROP CONSTRAINT open_windows_user_id_fkey;
       public               postgres    false    3247    216    210            �           2606    16488 3   user_installed_apps user_installed_apps_app_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_installed_apps
    ADD CONSTRAINT user_installed_apps_app_id_fkey FOREIGN KEY (app_id) REFERENCES public.apps(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.user_installed_apps DROP CONSTRAINT user_installed_apps_app_id_fkey;
       public               postgres    false    212    214    3251            �           2606    16483 4   user_installed_apps user_installed_apps_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_installed_apps
    ADD CONSTRAINT user_installed_apps_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.user_installed_apps DROP CONSTRAINT user_installed_apps_user_id_fkey;
       public               postgres    false    214    210    3247            N     x��Y�n�6��y
�Y��RJ����vȺu@���+P`�%��J��D9��}�}�Iɑl�m�nX��9Vw�������4K� ���޿�q��ރ������iFI��*Y�(�$Ͽ�'�$#s�c�赲+V�3@S'.8G��I�����!�i)/�
�)	�3w����{�z�/��1E��	� v+`QQq�(���y���a>�A��=��)4�uZf��WM^& ��R�Z�~�_�6	w<�P �J�q&�#��H� 
�\�9�1�YD��%g����̙bR�PF9QlF�d:B�{�^��X����q�Z�����{����D�RYd(�ݣ����HHE����8S�e���t�s��1�y�8��`��c������$�����|d,�y�UB�	�8@)�"&&�6�����BG�Q�?B9���E�8@�SN�G+�&� [h�J^$"@S�&S� `���� @c��d��\���'Xx�v�����~��� ��)x[M�az'i��W_�Q���1g�r��1��fyӟ�݄��zB:��2�㌥R2�� �u���T?M�M���U9�5���E��R�t����ji�g�,#+r+��ap�:�����	�B�v���%�v����{��}8����o�7k����L���^���.s�"5!w:���G(/b���+�z�oo�������+��u�@?�&����6��g�$!��B������(H�p�K}x/��Ⱥ4��K��Z��2���l" )�BY.'W$Sk#��.��.U�/�Uca�ɴl��	�M�[�n���A�0�Z41��ئ�*^Poaw���]@�G���Y�y_��	��wN]��b�!c��4�e�������M�|ֵX��-i�"W,���!;e����	��Rf�\\�Vݽ5��La�� ��~o� ��0���a�l��3L�T)�eD�S���Y..��8'�b�8��.5�'bF���L�ݏ��8�cg�#���o���Ҭ��sI'��O� ��o�����U��^���Ns&l���bP�7�G-bgӭ�H9�Y�u���(��vV�������]�$ڕ߼Fz3��4�5M��xxR%����ߙtn��q���u�w��q�Q+��3��6T��j�h)xEŮ����6�bU��	�}���]�z��"�ۯ���	�R�a���]s%�!��`	�{&�NH���8�1�h����kni7�^o�-nA;.8�
���j\G�.u5�(�5Y�#A��^�e��օ�a�2Ȑ���4�6�����"�R'%Z,�|>���%�b��A�8�^-����_'̫�:1�^-s��T��G�$�n�)��܋����c�g5ߦ�llyl
i�V���ї!t�z���d��3�.� �HNm��o�<�H-o��m�+(���:%�Y2�$�1�ˡc&��z�1��j�y׍i�xv@��jUd�2�o��աsڊ��m�cؗ�O;��-�k�}u�wi=T�#�iLKE��.�wN�)���L�z��;Љ��=�s<z}����7)��      T      x������ � �      R      x������ � �      P      x�3�42�4�2QF\@�i����� *{#      L   �  x��S]o�0}��6���㉮ F��4��J��8��|Є��Ki)l+ل&G�7>�=�\�8�*�
��=��"�VXdD�J���BTժ(# �(��	2�� ��m!���,ϵ=�4@�%F�"*�.6�!Iu��$.Od�H���R��&F�/��&��N7��eu�6ն_��NS@2*!Ӡ,V�/?MĝQ���($�(�Z)��iS��(�<U'i��{����I�be�-�1f7��}p�B�;��Ź�����^
��z�^&t�-�����O�}>���u���zf�k��=q��{��������pܷ>Z��;���iwO����A�7�/Y0��WQ��.���<���������j�魱_�{�m:���&b6��<��ِ��)<���R��`�'a4wF��(q�m�9�<����4@�*�Jd��P�]����������X�������{�΢���g�     