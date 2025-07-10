import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CircularSlider from 'react-native-circular-slider';
import { Svg, G, Path } from 'react-native-svg';

const WAKE_ICON_PATH =
  'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.64 5.64c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.06 1.06c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41L5.64 5.64zm12.72 12.72c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.06 1.06c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.06-1.06zM5.64 18.36l-1.06-1.06c-.39-.39-.39-1.02 0-1.41s1.02-.39 1.41 0l1.06 1.06c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0zm12.72-12.72l-1.06-1.06c-.39-.39-.39-1.02 0-1.41s1.02-.39 1.41 0l1.06 1.06c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0z';

const BEDTIME_ICON_PATH =
  'M15.22 5.3c-1.12.35-2.1.88-2.98 1.57-.9.68-1.68 1.5-2.34 2.42-.52.72-.94 1.5-1.28 2.32-.32.78-.54 1.6-.64 2.42h.02c-.01.1-.02.2-.02.3 0 .2.02.4.05.6.14.7.4 1.38.78 2 .4.62.9 1.18 1.5 1.65.6.48 1.28.88 2 1.2.75.32 1.52.55 2.32.68.85.15 1.72.15 2.58 0 .8-.12 1.58-.38 2.3-.72.72-.35 1.4-.8 2-1.32s1.1-1.12 1.5-1.8c.4-.68.7-1.4.88-2.18.18-.75.28-1.52.28-2.3 0-.9-.2-1.78-.52-2.6-.32-.82-.78-1.6-1.35-2.3-.6-.72-1.28-1.38-2.08-1.92-.8-.55-1.68-1-2.6-1.28-.42-.15-.85-.25-1.28-.32-.43-.08-.88-.12-1.32-.12-.7 0-1.4.1-2.08.28z';

const WAKE_ICON = <G><Path d={WAKE_ICON_PATH} fill="#fff" /></G>;
const BEDTIME_ICON = <G><Path d={BEDTIME_ICON_PATH} fill="#fff" /></G>;


const MINUTES_IN_DAY = 24 * 60;
const FIVE_MINUTE_ANGLE = (2 * Math.PI) / (MINUTES_IN_DAY / 5);

function roundAngleToFives(angle: number) {
  return Math.round(angle / FIVE_MINUTE_ANGLE) * FIVE_MINUTE_ANGLE;
}

function calculateMinutesFromAngle(angle: number) {
  const minutes = (angle / (2 * Math.PI)) * MINUTES_IN_DAY;
  return Math.round(minutes / 5) * 5;
}

function calculateTimeFromAngle(angle: number) {
  const minutes = calculateMinutesFromAngle(angle);
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return { h, m };
}

function padMinutes(min: number) {
  if (`${min}`.length < 2) {
    return `0${min}`;
  }
  return min;
}

const SleepPanel = () => {
  const [isTimerSet, setIsTimerSet] = useState(false);

  const bedtimeMins = 22 * 60; // 10 PM
  const waketimeMins = 7 * 60; // 7 AM
  const durationMins = (waketimeMins - bedtimeMins + MINUTES_IN_DAY) % MINUTES_IN_DAY;

  const [startAngle, setStartAngle] = useState((bedtimeMins / MINUTES_IN_DAY) * 2 * Math.PI);
  const [angleLength, setAngleLength] = useState((durationMins / MINUTES_IN_DAY) * 2 * Math.PI);

  const onUpdate = ({ startAngle, angleLength }: { startAngle: number; angleLength: number }) => {
    setStartAngle(roundAngleToFives(startAngle));
    setAngleLength(roundAngleToFives(angleLength));
  };
  
  const bedtime = calculateTimeFromAngle(startAngle);
  const waketime = calculateTimeFromAngle((startAngle + angleLength));
  const durationMinutes = calculateMinutesFromAngle(angleLength);

  const duration = {
    hours: Math.floor(durationMinutes / 60),
    minutes: durationMinutes % 60,
  };

  const showTime = isTimerSet || angleLength > 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timeInfo}>
           {/* <Image source={require('../../img/sleep-icon.png')} style={styles.timeIcon} /> */}
          <Text style={styles.timeLabel}>Sleep</Text>
          <Text style={styles.timeValue}>
            {showTime ? `${bedtime.h}:${padMinutes(bedtime.m)}` : '--:--'}
          </Text>
        </View>
        <View style={styles.timeInfo}>
           {/* <Image source={require('../../img/weekup.png')} style={styles.timeIcon} /> */}
          <Text style={styles.timeLabel}>Week up</Text>
          <Text style={styles.timeValue}>
            {showTime ? `${waketime.h}:${padMinutes(waketime.m)}` : '--:--'}
          </Text>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <CircularSlider
          startAngle={startAngle}
          angleLength={angleLength}
          onUpdate={onUpdate}
          segments={5}
          strokeWidth={40}
          radius={145}
          gradientColorFrom={isTimerSet ? '#4A90E2' : '#888'}
          gradientColorTo={isTimerSet ? '#F5A623' : '#888'}
          showClockFace
          clockFaceColor="rgba(255, 255, 255, 0.2)"
          bgCircleColor="#171717"
          startIcon={<G scale="1.1" transform={[{ translateX: -12 }, { translateY: -12 }]}>{BEDTIME_ICON}</G>}
          stopIcon={<G scale="1.1" transform={[{ translateX: -12 }, { translateY: -12 }]}>{WAKE_ICON}</G>}
        />
        <View style={styles.centerContent}>
          {showTime ? (
            <Text style={styles.durationText}>
              {String(duration.hours).padStart(2, '0')}
              <Text style={styles.durationUnit}>h</Text>{' '}
              {String(duration.minutes).padStart(2, '0')}
              <Text style={styles.durationUnit}>min</Text>
            </Text>
          ) : (
            <>
              <Text style={styles.promptText}>请先设置哄睡时间</Text>
              <Text style={styles.durationText}>
                --<Text style={styles.durationUnit}>h</Text> --
                <Text style={styles.durationUnit}>min</Text>
              </Text>
            </>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, isTimerSet && styles.cancelButton]}
        onPress={() => setIsTimerSet(!isTimerSet)}
        disabled={angleLength === 0}
      >
        <Text style={styles.buttonText}>
          {isTimerSet ? '取消哄睡定时' : '启动哄睡定时'}
        </Text>
      </TouchableOpacity>

      <View style={styles.audioSection}>
        <Text style={styles.audioLabel}>哄睡音频</Text>
        <TouchableOpacity style={styles.audioSelector}>
          <Text style={styles.audioValue}>音频1</Text>
          <Image
            source={require('../../img/edit-icon.png')}
            style={styles.audioEditIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  timeInfo: {
    alignItems: 'center',
  },
  timeIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  timeLabel: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 4,
  },
  timeValue: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  centerContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptText: {
    color: '#888',
    fontSize: 16,
    marginBottom: 10,
  },
  durationText: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: '300',
  },
  durationUnit: {
    fontSize: 18,
    color: '#888',
    fontWeight: 'normal',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginBottom: 40,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  audioSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2C2C2E',
    padding: 20,
    borderRadius: 12,
  },
  audioLabel: {
    color: '#FFF',
    fontSize: 16,
  },
  audioSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioValue: {
    color: '#888',
    fontSize: 16,
    marginRight: 10,
  },
  audioEditIcon: {
    width: 20,
    height: 20,
  },
});

export default SleepPanel; 