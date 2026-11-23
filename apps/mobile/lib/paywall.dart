import 'package:flutter/material.dart';
import 'package:in_app_purchase/in_app_purchase.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'src/config/env.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class PaywallPage extends StatefulWidget {
  const PaywallPage({Key? key}) : super(key: key);
  @override
  State<PaywallPage> createState() => _PaywallPageState();
}

class _PaywallPageState extends State<PaywallPage> {
  final InAppPurchase _iap = InAppPurchase.instance;
  bool available = false;
  List<ProductDetails> products = [];
  final storage = FlutterSecureStorage();

  @override
  void initState() {
    super.initState();
    initStore();
  }

  void initStore() async {
    available = await _iap.isAvailable();
    final response = await _iap.queryProductDetails({'ruach_monthly'});
    setState(() {
      products = response.productDetails;
    });
  }

  void buy(ProductDetails p) async {
    final purchaseParam = PurchaseParam(productDetails: p);
    _iap.buyNonConsumable(purchaseParam: purchaseParam);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0B0B0B),
      appBar: AppBar(title: Text('Unlock RUACH'), backgroundColor: Colors.black),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            Text('RUACH PRO', style: TextStyle(color: Colors.white, fontSize: 28)),
            SizedBox(height: 12),
            Text('Get unlimited journaling, AI reports and weekly PDF summaries for ₦1,000/month', style: TextStyle(color: Colors.white70)),
            SizedBox(height: 24),
            products.isEmpty ? CircularProgressIndicator() : ElevatedButton(
              onPressed: () => buy(products.first),
              style: ElevatedButton.styleFrom(backgroundColor: Color(0xFFFFC857), foregroundColor: Colors.black),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                child: Text('Start 7-day trial — ₦1,000/month', style: TextStyle(fontSize: 16)),
              ),
            )
          ],
        ),
      ),
    );
  }
}
