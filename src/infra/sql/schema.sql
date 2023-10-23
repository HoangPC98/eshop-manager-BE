CREATE TYPE gender AS ENUM ('male', 'female');
CREATE TYPE VoucherType AS ENUM ('freeship', 'discount')
CREATE TYPE PercentOrNumber AS ENUM ('percent', 'number')
CREATE TYPE activity_status AS ENUM ('activated', 'unactivated', 'locked')

CREATE TYPE OrderDeliveryStatus AS ENUM ('in_cart', 'pending_to_confirm', 'in_deliverying', 'success_delivered', 'fail_delivered', 'return_and_refund');
create type OrderPaymentStatus as enum ('unpaid', 'paid', 'refund');
CREATE TYPE CurrencyUnit AS ENUM ('vnd', 'dollar')

create table users (
	id varchar(13) primary key not null,
	uid varchar not null,
    password varchar(50) not null,
	fullname varchar not null,
	email varchar unique not null,
	phone_number varchar unique not null,
	gender gender,
    secret varchar,
	dob date not null,
	avatar varchar,
	created_at TIMESTAMP DEFAULT NOW(),
	deleted_at TIMESTAMP DEFAULT NOW()
)

create table sessions (
	id serial primary key,
	user_id varchar(13) not null,
	a_token varchar not null,
	fcm_token varchar,
	type varchar(20),
	status varchar(20),
	created_at TIMESTAMP DEFAULT NOW(),
	deleted_at TIMESTAMP DEFAULT NOW()
)

create table roles (
	id varchar(13) primary key,
	name varchar(33) not null,
	description varchar(66),
	level smallint not null,
    slug varchar(13) not null unique
)

create table roles_users (
	user_id varchar(13) not null,
	role_id varchar(13) not null,
	status activity_status
)

create table category (
	id varchar(33) primary key,
	category_industry_id varchar not null,
	name varchar(50) not null,
	desc varchar(255),
	slug varchar(33) unique
	foreign key (category_industry_id) references category_industry (id)
)

create table category_industry (
	id varchar(33) primary key,
	name varchar not null,
	description varchar
)

create table product (
	id varchar(33) primary key,
	name varchar(100) not null,
	category_id varchar(33) not null,
	origin_id varchar(33) not null,
	shop_id varchar(33) not null,
	slug varchar(33) unique,
	specs_n_details JSON,
	options JSON,
	promotion JSON,
	desc text,
	inventory_numer: int,
	sold_nunmber int,
	rating_score real,
	is_mall boolean not null default 0,
	origin_price int not null,
	discount int,
)

create table vourcher(
	id varchar(33) primary key,
	name varchar(33),
	desc varchar(255),
	condition JSON,
	total int,
	available_number int,
	used_number int,
	expired_at Date,
	type VoucherType,
	percent_or_number,
	maximum_of_number int,
	created_at Date,
	updated_at Date,
	deleted_at Date,
)

create table shop (
	id varchar(33) primary key,
	name varchar(100) not null,
	category_industry null,
	owner_id varchar(33),
	is_mall boolean,
	rating_score real,
	like_number int,
	type_of_bsn varchar(20),
	created_at Date,
	updated_at Date,
	deleted_at Date,
	constraint fk_shop_user foreign key (owner_uid) references users(uid)
)

create table image (
	id varchar(33) primary key,
	path varchar(255),
	belong_to_resource varchar(33),
	resource_id varchar(33),
)

create table orders (
	owner_uid varchar(33) not null,
	product_id varchar(33) not null,
	quantity int,
	total_price real,
	discount int,
	voucher_used varchar[],
	shiping_fee real,
	payment_method JSON,
	address_shipping varchar(255),
	created_at Date,
	updated_at Date,
	deleted_at Date,
	primary key (owner_uid, product_id,)
	constraint fk_cart_user foreign key (owner_uid) references users(uid),
	constraint fk_cart_prod foreign key (product_id) references product(id)
)

create table review_cmt (
	id varchar(33) primary key,
	belong_to_resource varchar(33),
	resource_id varchar(33),
	text varchar(1000),
	like_number int,
	rating_score int,
	created_at Date,
	updated_at Date,
	deleted_at Date,
)
