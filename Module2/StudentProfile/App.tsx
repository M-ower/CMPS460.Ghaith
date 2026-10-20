
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SectionCardProps = {
  title: string;
  children: React.ReactNode;
};

function SectionCard({ title, children }: SectionCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

type ProjectCardProps = {
  title: string;
  description: string;
};

function ProjectCard({ title, description }: ProjectCardProps) {
  return (
    <View style={styles.projectCard}>
      <Text style={styles.projectTitle}>{title}</Text>
      <Text style={styles.bodyText}>{description}</Text>
    </View>
  );
}

function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>GA</Text>
          </View>
          <Text style={styles.name}>Ghaith AlDarwash</Text>
          <Text style={styles.subtitle}>Software Development Student</Text>
          <Text style={styles.headerDescription}>
            Learning, building, and growing through technology.
          </Text>
        </View>

        <SectionCard title="About Me">
          <Text style={styles.bodyText}>
            I am a student at Point Park University working toward a career in
            software engineering. I enjoy learning new technologies, solving
            problems, and building useful applications.
          </Text>
        </SectionCard>

        <SectionCard title="My Projects">
          <ProjectCard
            title="Student Budget App"
            description="A project focused on helping students organize budgets, track spending, and manage savings goals."
          />
          <ProjectCard
            title="Web Development"
            description="Building websites and practicing layouts, design, and user-friendly interfaces."
          />
          <ProjectCard
            title="Mobile Development"
            description="Learning to create mobile applications with React Native and TypeScript."
          />
        </SectionCard>

        <SectionCard title="Development Tools">
          <Text style={styles.listItem}>• Visual Studio Code</Text>
          <Text style={styles.listItem}>• React Native</Text>
          <Text style={styles.listItem}>• TypeScript</Text>
          <Text style={styles.listItem}>• Android Studio</Text>
          <Text style={styles.listItem}>• Android Emulator</Text>
          <Text style={styles.listItem}>• Git and GitHub</Text>
        </SectionCard>

        <SectionCard title="Career Goals">
          <Text style={styles.bodyText}>
            My goal is to become a software engineer and continue improving my
            programming skills. In the future, I would also like to move into a
            management role in the software or IT field.
          </Text>
        </SectionCard>

        <SectionCard title="Personal Interests">
          <Text style={styles.bodyText}>
            Outside of programming, I enjoy cars, learning languages, and
            exploring new ideas. I like hands-on learning because it helps me
            understand how things work.
          </Text>
        </SectionCard>

        <SectionCard title="Contact">
          <Text style={styles.bodyText}>
            University: Point Park University
          </Text>
          <Text style={styles.bodyText}>Field: Software Development</Text>
          <Text style={styles.bodyText}>GitHub: github.com/M-ower</Text>
        </SectionCard>

        <Text style={styles.footer}>
          Personal Profile App • React Native
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    backgroundColor: '#14213D',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#FCA311',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#14213D',
    fontSize: 28,
    fontWeight: 'bold',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#FCA311',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 6,
  },
  headerDescription: {
    color: '#E2E8F0',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    color: '#14213D',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  bodyText: {
    color: '#334155',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 6,
  },
  projectCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FCA311',
  },
  projectTitle: {
    color: '#14213D',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listItem: {
    color: '#334155',
    fontSize: 15,
    marginBottom: 8,
  },
  footer: {
    color: '#64748B',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
});

export default App;