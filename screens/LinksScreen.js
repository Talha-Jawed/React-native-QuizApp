import React from 'react';
import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import CheckboxGroup from 'react-native-checkbox-group'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';



export default class LinksScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      select: [],
      count: 0,
      correct: 0,
      value: null,
      QUIZ: true,
      quizz: [
        {
          question: "What does HTML stand for?",
          options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
          ans: "Hyper Text Markup Language"
        },

        {
          question: "Who is making the Web standards?",
          options: ["Microsoft", "The World Wide Web Consortium", "Google"],
          ans: "The World Wide Web Consortium"
        },

        {
          question: 'Choose the correct HTML element for the largest heading?',
          options: ['<head>', '<heading>', '<h1>'],
          ans: '<h1>'
        },
        {
          question: "What does CSS stand for?",
          options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
          ans: "Cascading Style Sheets"
        },

        {
          question: "Where in an HTML document is the correct place to refer to an external style sheet?",
          options: ["In the <body> section", "In the <head> section", "At the end of the document"],
          ans: "In the <head> section"
        },

        {
          question: 'Which HTML tag is used to define an internal style sheet?',
          options: ['<script>', '<css>', '<style>'],
          ans: '<style>'
        },
        {
          question: "Which property is used to change the background color?",
          options: ["color", "background-color", "bgcolor"],
          ans: "background-color"
        },

        {
          question: "Which CSS property is used to change the text color of an element?",
          options: ["fgcolor", "color", "text-color"],
          ans: "color"
        },

        {
          question: 'Which CSS property controls the text size?',
          options: ['text-size', 'font-style', 'font-size'],
          ans: 'font-size'
        },
        {
          question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
          options: ['<script name="xxx.js">', '<script href="xxx.js">', '<script src="xxx.js">'],
          ans: '<script src="xxx.js">'
        }
      ]
    }

  }
  static navigationOptions = {
    title: 'Quiz',
  };
  Next(ans) {
    const { count, quizz, value, correct } = this.state
    let add = count + 1
    console.log(ans, 'length******');
    if (value) {
      this.setState({ count: add })
      if (ans === value) {
        let mark = correct + 10
        this.setState({ correct: mark, value: null })
      } else {
        this.setState({ value: null })
      }
      if (correct >= 50) {
        this.setState({ status: 'PASS' })
      } else {
        this.setState({ status: 'FAIL' })
      }
    } else {
      console.log('plz select');
      alert("plz select")
    }


  }

  Again() {
    this.setState({ QUIZ: true, count: 0, correct: 0 })
  }


  render() {
    const { quizz, select, status, count, correct, QUIZ } = this.state

    return (
      <ScrollView style={styles.container}>
        {QUIZ === true &&
          quizz.map((item, index) => {
            if (index === count) {

              console.log(item.question);

              var radio_props = [

                { label: item.options[0], value: item.options[0] },
                { label: item.options[1], value: item.options[1] },
                { label: item.options[2], value: item.options[2] },
              ];
              return (
                <View key={index + 'talha'}>
                  <Text style={{ fontSize: 30 }}>{'Q' + count + ':' + item.question}</Text>
                  <View style={styles.options} >
                    <RadioForm
                      radio_props={radio_props}
                      initial={-1}
                      onPress={(value) => { this.setState({ value: value }) }}
                    />
                  </View>
                  <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Button
                      style={styles.Button}
                      borderRadius={10}
                      margin={10}
                      title='Next'
                      onPress={() => this.Next(item.ans)}
                      // icon="fast-forward"
                    />

                  </View>
                </View>
              )
            }
          })
        }{
          count === 10 &&
          <View style={styles.result}>
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Result</Text>
            <View>
              <Text style={{ fontSize: 20, textDecorationLine: 'underline' }}>{correct / 100 * 100 + '%  ' + status}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Button
                style={styles.Button}
                borderRadius={10}
                marginTop={20}
                title=' Play Again '
                onPress={() => this.Again()}
              />

            </View>
          </View>
        }

        {/* </View> */}
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    
  },
  options: {
    flex: 1,
    fontSize: 30,
    marginLeft: 10,
    marginTop: 20,

  },
  result: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    alignItems: 'center',
  },
  Button: {
    margin: 20

  }
});
