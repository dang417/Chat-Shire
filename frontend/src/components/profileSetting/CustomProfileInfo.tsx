import React, { useEffect, useState } from "react";
import styles from "./CustomProfileInfo.module.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import MultiSelect from "../error/MultiSelect";
import { useRecoilState } from "recoil";
import { loginuser, isLogin_recoil } from "../../stores/atom";
import { styled } from '@mui/system';

interface CustomProfileProps {
  onUpdatenickname: any;
  onUpdateintroduction: any;
  onUpdatedetailIntroduction: any;
  onUpdatemySkill: any;
  onUpdateposition: any;
  onUserLogin: () => void;
  onUserUpdate: () => void;
}

export default function CustomProfileInfo({
  onUpdatenickname,
  onUpdateintroduction,
  onUpdatedetailIntroduction,
  onUpdateposition,
  onUpdatemySkill,
  onUserLogin,
  onUserUpdate,
}: CustomProfileProps) {
  const [nickname, setNickname] = useState("");
  const [position, setPosition] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [detailIntroduction, setDetailIntroduction] = useState("");
  const [userData, setUserData] = useRecoilState(loginuser);
  const [isLogin, setIsLogin] = useRecoilState(isLogin_recoil);
  const [selectedId, setSelectedId] = useState<string[]>([]);

  const selectSkill = (e: any) => {
    if (selectedId && selectedId?.includes(String(e.target.id))) {
      const newSelectedId = selectedId.filter((item) => item != e.target.id);
      setSelectedId(newSelectedId);
      onUpdatemySkill(newSelectedId);
    } else {
      const newSelectedId = [...selectedId, String(e.target.id)];
      setSelectedId(newSelectedId);
      onUpdatemySkill(newSelectedId);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nickname") {
      setNickname(value);
      onUpdatenickname(value);
    } else if (name === "introduction") {
      setIntroduction(value);
      onUpdateintroduction(value);
    } else if (name === "detailIntroduction") {
      setDetailIntroduction(value);
      onUpdatedetailIntroduction(value);
    } else if (name === "position") {
      setPosition(value);
      onUpdateposition(value);
    }
  };

  const StyledTextField = styled(TextField)({
    '& .MuiInputBase-input': {
      fontFamily: 'preRg',
    },
  });
  
  useEffect(() => {
    if (isLogin) {
      setNickname(userData.nickname);
      setPosition(userData.position);
      setIntroduction(userData.introduction);
      setDetailIntroduction(userData.detailIntroduction);
      setSelectedId(userData.mySkill);
    }
  }, []);

  return (
    <div className={styles.ProfileInfoContainer}>
      <div className={styles.ProfileInfoHeader}>
        <span className={styles.AvatarCustomTitle}>내 정보</span>
      </div>
      <div className={styles.ProfileInfoBody}>
        <StyledTextField
          fullWidth
          name="nickname"
          color="greenary"
          margin="dense"
          required
          id="nickname"
          label="어떻게 부르면 될까요?"
          // defaultValue={nickname}
          value={nickname}
          variant="standard"
          onChange={handleInputChange}
          // helperText="Please enter your name"
        />
        <span style={{ fontSize: '13px', margin: "13px 0px -4px 0px", fontFamily: "preLt" }}>
          보유한 기술스택을 골라주세요 *
        </span>
        <div className={styles.ProfileInfoSkillSelector}>
          <img
            id="java"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("java")
                ? `https://img.shields.io/badge/java-437291?style=for-the-badge&logo=openjdk&logoColor=white`
                : `https://img.shields.io/badge/java-757575?style=for-the-badge&logo=openjdk&logoColor=white`
            }
            alt=""
          />
          <img
            id="python"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("python")
                ? `https://img.shields.io/badge/python-3777AB?style=for-the-badge&logo=python&logoColor=white`
                : `https://img.shields.io/badge/python-757575?style=for-the-badge&logo=python&logoColor=white`
            }
            alt=""
          />
          <img
            id="javascript"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("javascript")
                ? `https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white`
                : `https://img.shields.io/badge/javascript-757575?style=for-the-badge&logo=javascript&logoColor=white`
            }
            alt=""
          />
          <img
            id="html5"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("html5")
                ? `https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white`
                : `https://img.shields.io/badge/html5-757575?style=for-the-badge&logo=html5&logoColor=white`
            }
            alt=""
          />
          <img
            id="css3"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("css3")
                ? `https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white`
                : `https://img.shields.io/badge/css3-757575?style=for-the-badge&logo=css3&logoColor=white`
            }
            alt=""
          />
          <img
            id="c"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("c")
                ? `https://img.shields.io/badge/c-A8B9CC?style=for-the-badge&logo=c&logoColor=white`
                : `https://img.shields.io/badge/c-757575?style=for-the-badge&logo=c&logoColor=white`
            }
            alt=""
          />
          <img
            id="c++"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("c++")
                ? `https://img.shields.io/badge/c++-A8B9CC?style=for-the-badge&logo=c%2B%2B&&logoColor=white`
                : `https://img.shields.io/badge/c++-757575?style=for-the-badge&logo=c%2B%2B&&logoColor=white`
            }
            alt=""
          />
          <img
            id="r"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("r")
                ? `https://img.shields.io/badge/r-276DC3?style=for-the-badge&logo=r&logoColor=white`
                : `https://img.shields.io/badge/r-757575?style=for-the-badge&logo=r&logoColor=white`
            }
            alt=""
          />
          <img
            id="flutter"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("flutter")
                ? `https://img.shields.io/badge/flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white`
                : `https://img.shields.io/badge/flutter-757575?style=for-the-badge&logo=flutter&logoColor=white`
            }
            alt=""
          />
          <img
            id="dart"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("dart")
                ? `https://img.shields.io/badge/dart-0175C2?style=for-the-badge&logo=dart&logoColor=white`
                : `https://img.shields.io/badge/dart-757575?style=for-the-badge&logo=dart&logoColor=white`
            }
            alt=""
          />
          <img
            id="kotlin"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("kotlin")
                ? `https://img.shields.io/badge/kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white`
                : `https://img.shields.io/badge/kotlin-757575?style=for-the-badge&logo=kotlin&logoColor=white`
            }
            alt=""
          />
          <img
            id="pwa"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("pwa")
                ? `https://img.shields.io/badge/pwa-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white`
                : `https://img.shields.io/badge/pwa-757575?style=for-the-badge&logo=pwa&logoColor=white`
            }
            alt=""
          />
          <img
            id="php"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("php")
                ? `https://img.shields.io/badge/php-777BB4?style=for-the-badge&logo=php&logoColor=white`
                : `https://img.shields.io/badge/php-757575?style=for-the-badge&logo=php&logoColor=white`
            }
            alt=""
          />
          <img
            id="django"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("django")
                ? `https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white`
                : `https://img.shields.io/badge/django-757575?style=for-the-badge&logo=django&logoColor=white`
            }
            alt=""
          />
          <img
            id="spring"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("spring")
                ? `https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white`
                : `https://img.shields.io/badge/spring-757575?style=for-the-badge&logo=spring&logoColor=white`
            }
            alt=""
          />
          <img
            id="vue"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("vue")
                ? `https://img.shields.io/badge/vue-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white`
                : `https://img.shields.io/badge/vue-757575?style=for-the-badge&logo=vue.js&logoColor=white`
            }
            alt=""
          />
          <img
            id="react"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("react")
                ? `https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white`
                : `https://img.shields.io/badge/react-757575?style=for-the-badge&logo=react&logoColor=white`
            }
            alt=""
          />
          <img
            id="next"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("next")
                ? `https://img.shields.io/badge/next-000000?style=for-the-badge&logo=next.js&logoColor=white`
                : `https://img.shields.io/badge/next-757575?style=for-the-badge&logo=next.js&logoColor=white`
            }
            alt=""
          />
          <img
            id="node"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("node")
                ? `https://img.shields.io/badge/node-339933?style=for-the-badge&logo=node.js&logoColor=white`
                : `https://img.shields.io/badge/node-757575?style=for-the-badge&logo=node.js&logoColor=white`
            }
            alt=""
          />
          <img
            id="angular"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("angular")
                ? `https://img.shields.io/badge/angular-DD0031?style=for-the-badge&logo=angular&logoColor=white`
                : `https://img.shields.io/badge/angular-757575?style=for-the-badge&logo=angular&logoColor=white`
            }
            alt=""
          />
          <img
            id="jenkins"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("jenkins")
                ? `https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white`
                : `https://img.shields.io/badge/jenkins-757575?style=for-the-badge&logo=jenkins&logoColor=white`
            }
            alt=""
          />
          <img
            id="docker"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("docker")
                ? `https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white`
                : `https://img.shields.io/badge/docker-757575?style=for-the-badge&logo=docker&logoColor=white`
            }
            alt=""
          />
          <img
            id="aws"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("aws")
                ? `https://img.shields.io/badge/aws-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white`
                : `https://img.shields.io/badge/aws-757575?style=for-the-badge&logo=amazonaws&logoColor=white`
            }
            alt=""
          />
          <img
            id="kubernetes"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("kubernetes")
                ? `https://img.shields.io/badge/kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white`
                : `https://img.shields.io/badge/kubernetes-757575?style=for-the-badge&logo=kubernetes&logoColor=white`
            }
            alt=""
          />
          <img
            id="three"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("three")
                ? `https://img.shields.io/badge/three-000000?style=for-the-badge&logo=three.js&logoColor=white`
                : `https://img.shields.io/badge/three-757575?style=for-the-badge&logo=three.js&logoColor=white`
            }
            alt=""
          />
          <img
            id="aframe"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("aframe")
                ? `https://img.shields.io/badge/aframe-EF2D5E?style=for-the-badge&logo=a-frame&logoColor=white`
                : `https://img.shields.io/badge/aframe-757575?style=for-the-badge&logo=a-frame&logoColor=white`
            }
            alt=""
          />
          <img
            id="unity"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("unity")
                ? `https://img.shields.io/badge/unity-000000?style=for-the-badge&logo=unity&logoColor=white`
                : `https://img.shields.io/badge/unity-757575?style=for-the-badge&logo=unity&logoColor=white`
            }
            alt=""
          />
          <img
            id="unreal"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("unreal")
                ? `https://img.shields.io/badge/unreal-0E1128?style=for-the-badge&logo=unrealengine&logoColor=white`
                : `https://img.shields.io/badge/unreal-757575?style=for-the-badge&logo=unrealengine&logoColor=white`
            }
            alt=""
          />
          <img
            id="tomcat"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("tomcat")
                ? `https://img.shields.io/badge/tomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=white`
                : `https://img.shields.io/badge/tomcat-757575?style=for-the-badge&logo=apachetomcat&logoColor=white`
            }
            alt=""
          />
          <img
            id="spark"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("spark")
                ? `https://img.shields.io/badge/spark-E25A1C?style=for-the-badge&logo=apachespark&logoColor=white`
                : `https://img.shields.io/badge/spark-757575?style=for-the-badge&logo=apachespark&logoColor=white`
            }
            alt=""
          />
          <img
            id="hadoop"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("hadoop")
                ? `https://img.shields.io/badge/hadoop-66CCFF?style=for-the-badge&logo=apachehadoop&logoColor=white`
                : `https://img.shields.io/badge/hadoop-757575?style=for-the-badge&logo=apachehadoop&logoColor=white`
            }
            alt=""
          />
          <img
            id="git"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("git")
                ? `https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white`
                : `https://img.shields.io/badge/git-757575?style=for-the-badge&logo=git&logoColor=white`
            }
            alt=""
          />
        </div>
        <StyledTextField
          fullWidth
          name="position"
          color="greenary"
          margin="dense"
          required
          id="standard-required"
          label="어떤 포지션을 맡고 계신가요?"
          // defaultValue={position}
          value={position}
          variant="standard"
          onChange={handleInputChange}
          // helperText="Please enter your name"
        />
        <StyledTextField
          value={introduction}
          fullWidth
          name="introduction"
          color="greenary"
          margin="dense"
          required
          id="standard-required"
          label="나를 자랑해주세요"
          // defaultValue={introduction}
          variant="standard"
          onChange={handleInputChange}
          // helperText="Please enter your name"
        />
        <StyledTextField
          fullWidth
          name="detailIntroduction"
          color="greenary"
          margin="dense"
          required
          id="standard-required"
          label="간단한 소개를 해주세요"
          // defaultValue={detailIntroduction}
          value={detailIntroduction}
          variant="standard"
          onChange={handleInputChange}
          // helperText="Please enter your name"
        />
      </div>
      {isLogin ? (
        <Button
          sx={{
            width: "100%",
            height: "53px",
            fontFamily: "preBd",
            fontSize: "18px",
            marginBottom: '10px'
          }}
          color="greenary"
          variant="contained"
          onClick={onUserUpdate}
        >
          저장하기
        </Button>
      ) : (
        <Button
          sx={{
            width: "100%",
            height: "53px",
            fontFamily: "preBd",
            fontSize: "18px",
            marginBottom: '5px'
          }}
          color="greenary"
          variant="contained"
          onClick={onUserLogin}
        >
          회원가입
        </Button>
      )}
    </div>
  );
}
