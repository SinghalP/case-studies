import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Icon } from 'react-icons-kit'
import {calendar, film} from 'react-icons-kit/fa'
import './Header.scss';

const Header = () => {
	return (
			<header className="header">
				<NavLink exact to="/" className="header-movie">
					<Icon icon={film} />
					<span className="title">
						<FormattedMessage id="header.tab.title" />
					</span>
				</NavLink>
				<NavLink to="/screen-time" className="header-timing">
					<Icon icon={calendar} />
					<span className="title">
						<FormattedMessage id="header.tab.screeTimes" />
					</span>
				</NavLink>
			</header>
	);
};

export default Header;