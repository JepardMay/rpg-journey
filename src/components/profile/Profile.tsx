import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import {
  LEVEL_TYPE,
  SkillType,
} from '../../models';
import { calculatePercent } from '../../utils/levels';

import Page from '../common/Page';

import '../../assets/styles/components/profile.css';

function Profile() {
  const user = useSelector((state: RootState) => state.user);

  const skillsList = user.skills.map((skill: SkillType) => (
    <li className="item" key={'skill-' + skill.name.toLowerCase()}>
      <div className="skill">
        <div className="skill__wrapper">
          {skill.name}
          <span className="skill__level">{skill.level}</span>
        </div>
        <div className="skill__progress">
          <div
            className="skill__progressbar"
            style={{ width: calculatePercent(skill.xp, skill.level, LEVEL_TYPE.USER) }}
          ></div>
        </div>
      </div>
    </li>
  ));

  return (
    <Page title="Profile">
      <div className="container">
        <div className="profile">
          <div className="profile__header">
            <div className="profile__image">
              <img
                src="https://cdn.picrew.me/app/image_maker/112842/icon_iSBiZxgHkBMeQTym.png"
                alt="Avatar"
              />
            </div>
            <div className="profile__block">
              <h2 className="profile__name">{user.name}</h2>
              <p className="profile__text profile__text--sm">
                Level:&nbsp;
                <span className="profile__badge">{user.level}</span>
              </p>
            </div>
          </div>
          <div className="profile__friends">
            <h2 className="profile__text title">
              Friends<span className="profile__number">&nbsp;4</span>
            </h2>
            <ul className="list list--grid">
              <li className="item">
                <div className="friend">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1wfzMTHxT_WyKp_ynEz-8-ROVOroKdS74wg&usqp=CAU"
                    alt="Jane Doe"
                    title="Jane Doe"
                  />
                </div>
              </li>
              <li className="item">
                <div className="friend">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrElI9gCC99M6nub8cAORJGTqlrMmqfM9SSg&usqp=CAU"
                    alt="Mary Sue"
                    title="Mary Sue"
                  />
                </div>
              </li>
              <li className="item">
                <div className="friend">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2dOI37yUG1FW-dn4qGv_5Fd7ru60Lb9bBvg&usqp=CAU"
                    alt="Naruto Uzumaki"
                    title="Naruto Uzumaki"
                  />
                </div>
              </li>
              <li className="item">
                <div className="friend">
                  <img
                    src="https://play-lh.googleusercontent.com/fV48CpdU88Kd7jP8jRU-awdT1nXqEovSFTbVG1d_7v9zHFy_5P9gh1zYSOh6sUBWNtM"
                    alt="John Doe"
                    title="John Doe"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className="profile__achievements">
            <h2 className="profile__text title">
              Achievements<span className="profile__number">&nbsp;1</span>
            </h2>
            <ul className="list list--grid">
              <li className="item">
                <div className="achievement">
                  <img
                    src="https://www.svgrepo.com/show/105548/achievement.svg"
                    alt="For skills"
                    title="For skills"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className="profile__skills">
            <h2 className="profile__text title">
              Skills
              <span className="profile__number">
                &nbsp;{user.skills.length}
              </span>
            </h2>
            <ul className="list">{skillsList}</ul>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Profile;
