import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import CheckboxGroup from 'react-native-checkbox-group'


export default class LinksScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      select:[],
      
      quizz: [
        {
          question: "What does HTML stand for?",
          options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "All of the Above"],
          ans: "Hyper Text Markup Language"
        },

        {
          question: "Who is making the Web standards?",
          options: ["Microsoft", "The World Wide Web Consortium", "Mozilla", "Google"],
          ans: "The World Wide Web Consortium"
        },

        {
          question: 'Choose the correct HTML element for the largest heading?',
          options: ['<h6>', '<head>', '<heading>', '<h1>'],
          ans: '<h1>'
        }
      ]
    }
  }
  static navigationOptions = {
    title: 'Quiz',
  };

  render() {
    const { quizz , select ,tick} = this.state
    console.log(select ,'*******');
    const ans = quizz
    console.log(ans.ans , 'ans***');
    
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        {/* <ExpoLinksView /> */}
        <View>
          {/* <CheckboxGroup
              callback={(selected) => { console.log(selected) }}
              iconColor={"#00a2dd"}
              iconSize={30}
              checkedIcon="ios-checkbox-outline"
              uncheckedIcon="ios-square-outline"
              checkboxes={[
                {
                  
                  label: "first", // label for checkbox item
                  value: 1, // selected value for item, if selected, what value should be sent?
                  // selected: true // if the item is selected by default or not.
                  
                },
                {
                  label: "second",
                  value: 2 ,
                  
                },
              ]}
              labelStyle={{
                color: '#333'
              }}
              rowStyle={{
                flexDirection: 'row'
              }}
              rowDirection={"column"}
            /> */}

          {
            quizz.map((item) => {
              return (
               <View>
                  <Text>{item.question}</Text>
                  <CheckboxGroup
                    callback={(value) =>this.setState({select:value}) }
                    iconColor={"#00a2dd"}
                    iconSize={30}
                    checkedIcon="ios-checkbox-outline"
                    uncheckedIcon="ios-square-outline"
                    checkboxes={[
                      {

                        label: item.options[0], // label for checkbox item
                        value: item.options[0], // selected value for item, if selected, what value should be sent?
                        // selected=this.selected === item.options[0] // if the item is selected by default or not.

                      },
                      {
                        label: item.options[1],
                        value: item.options[1],
                        // selected=this.state.selected === item.options[1]
                      },
                      {
                        label: item.options[2],
                        value: item.options[2],
                        // selected=this.state.selected === item.options[2]
                      },
                    ]}
                    labelStyle={{
                      color: '#333'
                    }}
                    rowStyle={{
                      flexDirection: 'row'
                    }}
                    rowDirection={"column"}
                  />
                </View>
              )
            })
          }

        </View>
      </ScrollView>
    );
  }
  StartQuiz(ans, qus, opt1, opt2, opt3) {
    console.log(qus, 'qus****');
    console.log(opt1, 'opt****');
    <View>
      <Text>{qus}</Text>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
