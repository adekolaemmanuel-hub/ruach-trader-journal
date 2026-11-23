import 'package:flutter/material.dart';
import 'paywall.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'RUACH Demo',
      theme: ThemeData.dark(),
      home: const PaywallPage(),
    );
  }
}
